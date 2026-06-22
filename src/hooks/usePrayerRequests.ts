import { useCallback, useEffect, useState } from "react";
import { mockPrayerRequests } from "../data/mockData";
import {
  supabase,
  supabaseConfigError,
  type PrayerRequestRow,
} from "../lib/supabaseClient";
import type { PrayerRequest } from "../types/domain";

const USER_NAME_STORAGE_KEY = "shekinah_user_name";
const PRAYED_REQUESTS_STORAGE_KEY = "shekinah_prayed_requests";
const MOCK_REQUEST_IDS = new Set(mockPrayerRequests.map((request) => request.id));

export type CreatePrayerRequestInput = {
  name?: string;
  request: string;
  isAnonymous: boolean;
  category?: string;
};

const canUseLocalStorage = () => typeof window !== "undefined" && "localStorage" in window;

const isPrayerCategory = (value: unknown): value is PrayerRequest["category"] =>
  value === "familia" ||
  value === "saude" ||
  value === "direcao" ||
  value === "gratidao" ||
  value === "outro";

const hashString = (value: string) => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash).toString(36);
};

const createClientSideId = (request: Pick<PrayerRequest, "name" | "request" | "category">) =>
  `supabase-${hashString(`${request.name ?? ""}|${request.request}|${request.category}`)}`;

const getCreatedAtTime = (request: PrayerRequest) => {
  const createdAtTime = new Date(request.createdAt).getTime();

  return Number.isNaN(createdAtTime) ? 0 : createdAtTime;
};

const sortByCreatedAtDesc = (requests: PrayerRequest[]) =>
  [...requests].sort(
    (first, second) =>
      getCreatedAtTime(second) - getCreatedAtTime(first),
  );

const mapSupabaseRowToPrayerRequest = (
  row: PrayerRequestRow,
  currentRequests: PrayerRequest[],
): PrayerRequest | null => {
  if (!row.request) {
    return null;
  }

  const category = isPrayerCategory(row.category) ? row.category : "outro";
  const mappedWithoutDate = {
    id: row.id ?? "",
    name: row.name?.trim() || (row.isAnonymous ? "Anônimo" : "Membro"),
    request: row.request,
    isAnonymous: row.isAnonymous,
    prayingCount: row.prayingCount ?? 0,
    createdAt: row.createdAt ?? "",
    category,
  } satisfies PrayerRequest;
  const id = row.id ?? createClientSideId(mappedWithoutDate);
  const currentRequest = currentRequests.find((request) => request.id === id);

  return {
    ...mappedWithoutDate,
    id,
    createdAt: row.createdAt ?? currentRequest?.createdAt ?? new Date().toISOString(),
  };
};

const mergePrayerRequests = (
  remoteRows: PrayerRequestRow[],
  currentRequests: PrayerRequest[] = [],
) => {
  const remoteRequests = remoteRows
    .map((row) => mapSupabaseRowToPrayerRequest(row, currentRequests))
    .filter((request): request is PrayerRequest => request !== null);
  const remoteRequestIds = new Set(remoteRequests.map((request) => request.id));
  const fixedMockRequests = mockPrayerRequests.map((mockRequest) => {
    const currentRequest = currentRequests.find((request) => request.id === mockRequest.id);

    return {
      ...mockRequest,
      prayingCount: currentRequest?.prayingCount ?? mockRequest.prayingCount,
    };
  });
  const fixedMockRequestsById = new Map(
    fixedMockRequests.map((request) => [request.id, request]),
  );

  if (currentRequests.length === 0) {
    return sortByCreatedAtDesc([...remoteRequests, ...fixedMockRequests]);
  }

  const currentRequestIds = new Set(currentRequests.map((request) => request.id));
  const remoteRequestsById = new Map(
    remoteRequests.map((request) => [request.id, request]),
  );
  const newRemoteRequests = remoteRequests.filter(
    (request) => !currentRequestIds.has(request.id),
  );
  const updatedCurrentRequests = currentRequests.map(
    (request) =>
      remoteRequestsById.get(request.id) ??
      fixedMockRequestsById.get(request.id) ??
      request,
  );
  const missingMockRequests = fixedMockRequests.filter(
    (request) =>
      !currentRequestIds.has(request.id) && !remoteRequestIds.has(request.id),
  );

  return [
    ...sortByCreatedAtDesc(newRemoteRequests),
    ...updatedCurrentRequests,
    ...missingMockRequests,
  ];
};

const toSupabaseInsert = (request: PrayerRequest) => ({
  name: request.name ?? (request.isAnonymous ? "Anônimo" : "Membro"),
  request: request.request,
  isAnonymous: request.isAnonymous,
  prayingCount: request.prayingCount,
  category: request.category,
});

const getSupabaseErrorMessage = (message: string) => {
  if (message.includes("row-level security")) {
    return "O Supabase recusou a gravação. Verifique as policies de RLS da tabela prayer_requests.";
  }

  return message;
};

const getStoredPrayedRequestIds = () => {
  if (!canUseLocalStorage()) {
    return [];
  }

  const storedValue = window.localStorage.getItem(PRAYED_REQUESTS_STORAGE_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
};

const savePrayedRequestIds = (ids: string[]) => {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(PRAYED_REQUESTS_STORAGE_KEY, JSON.stringify(ids));
};

export function getUserName() {
  if (!canUseLocalStorage()) {
    return "";
  }

  return window.localStorage.getItem(USER_NAME_STORAGE_KEY) ?? "";
}

export function setUserName(name: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(USER_NAME_STORAGE_KEY, name.trim());
}

export function usePrayerRequests() {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() =>
    mergePrayerRequests([]),
  );
  const [prayedRequestIds, setPrayedRequestIds] = useState<string[]>(() =>
    getStoredPrayedRequestIds(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasPrayed = useCallback(
    (id: string) => prayedRequestIds.includes(id),
    [prayedRequestIds],
  );

  const addPrayedRequestId = useCallback((id: string) => {
    setPrayedRequestIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds;
      }

      const updatedIds = [...currentIds, id];
      savePrayedRequestIds(updatedIds);

      return updatedIds;
    });
  }, []);

  const removePrayedRequestId = useCallback((id: string) => {
    setPrayedRequestIds((currentIds) => {
      const updatedIds = currentIds.filter((currentId) => currentId !== id);
      savePrayedRequestIds(updatedIds);

      return updatedIds;
    });
  }, []);

  const fetchPrayerRequests = useCallback(async () => {
    setIsLoading(true);

    if (!supabase) {
      setError(supabaseConfigError);
      setPrayerRequests((currentRequests) => mergePrayerRequests([], currentRequests));
      setIsLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("prayer_requests")
      .select("*");

    if (fetchError) {
      setError(fetchError.message);
      setPrayerRequests((currentRequests) => mergePrayerRequests([], currentRequests));
      setIsLoading(false);
      return;
    }

    setError(null);
    setPrayerRequests((currentRequests) => mergePrayerRequests(data ?? [], currentRequests));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void fetchPrayerRequests();

    if (!supabase) {
      return undefined;
    }

    const supabaseClient = supabase;
    const channel = supabaseClient
      .channel("prayer_requests_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "prayer_requests",
        },
        () => {
          void fetchPrayerRequests();
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          setError("Não foi possível conectar ao Realtime dos pedidos de oração.");
        }
      });

    return () => {
      void supabaseClient.removeChannel(channel);
    };
  }, [fetchPrayerRequests]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === PRAYED_REQUESTS_STORAGE_KEY) {
        setPrayedRequestIds(getStoredPrayedRequestIds());
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const addPrayerRequest = useCallback(
    async (
      requestTextOrInput: string | CreatePrayerRequestInput,
      isAnonymous?: boolean,
      category?: string,
    ) => {
      const normalizedInput: CreatePrayerRequestInput =
        typeof requestTextOrInput === "string"
          ? {
              request: requestTextOrInput,
              isAnonymous: isAnonymous ?? false,
              category,
            }
          : requestTextOrInput;

      const trimmedRequest = normalizedInput.request.trim();

      if (!trimmedRequest) {
        return false;
      }

      const requestCategory = isPrayerCategory(normalizedInput.category)
        ? normalizedInput.category
        : "outro";
      const name = normalizedInput.isAnonymous
        ? "Anônimo"
        : normalizedInput.name?.trim() || getUserName().trim() || "Membro";
      const newPrayerRequest = {
        id: createClientSideId({
          name,
          request: trimmedRequest,
          category: requestCategory,
        }),
        name,
        request: trimmedRequest,
        isAnonymous: normalizedInput.isAnonymous,
        prayingCount: 0,
        createdAt: new Date().toISOString(),
        category: requestCategory,
      } satisfies PrayerRequest;

      if (!supabase) {
        setError(supabaseConfigError);
        return false;
      }

      const { data, error: insertError } = await supabase
        .from("prayer_requests")
        .insert(toSupabaseInsert(newPrayerRequest))
        .select();

      if (insertError) {
        setError(getSupabaseErrorMessage(insertError.message));
        return false;
      }

      setError(null);

      setPrayerRequests((currentRequests) =>
        mergePrayerRequests(data && data.length > 0 ? data : [newPrayerRequest], currentRequests),
      );

      return true;
    },
    [],
  );

  const incrementPrayingCount = useCallback(async (id: string) => {
    if (hasPrayed(id)) {
      return;
    }

    const currentRequest = prayerRequests.find((request) => request.id === id);

    if (!currentRequest) {
      return;
    }

    const nextPrayingCount = currentRequest.prayingCount + 1;
    addPrayedRequestId(id);

    if (MOCK_REQUEST_IDS.has(id)) {
      setPrayerRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === id ? { ...request, prayingCount: nextPrayingCount } : request,
        ),
      );
      return;
    }

    if (!supabase) {
      setError(supabaseConfigError);
      removePrayedRequestId(id);
      return;
    }

    const updateQuery = supabase
      .from("prayer_requests")
      .update({ prayingCount: nextPrayingCount });
    const updateFilter = currentRequest.id.startsWith("supabase-")
      ? updateQuery.match({
          name: currentRequest.name ?? (currentRequest.isAnonymous ? "Anônimo" : "Membro"),
          request: currentRequest.request,
          isAnonymous: currentRequest.isAnonymous,
          category: currentRequest.category,
        })
      : updateQuery.eq("id", currentRequest.id);
    const { data, error: updateError } = await updateFilter.select();

    if (updateError) {
      setError(getSupabaseErrorMessage(updateError.message));
      removePrayedRequestId(id);
      return;
    }

    setError(null);

    setPrayerRequests((currentRequests) =>
      mergePrayerRequests(
        data && data.length > 0 ? data : [{ ...currentRequest, prayingCount: nextPrayingCount }],
        currentRequests,
      ),
    );
  }, [
    addPrayedRequestId,
    hasPrayed,
    prayerRequests,
    removePrayedRequestId,
  ]);

  return {
    prayerRequests,
    requests: prayerRequests,
    isLoading,
    error,
    addPrayerRequest,
    incrementPrayingCount,
    markPraying: incrementPrayingCount,
    hasPrayed,
    getUserName,
    setUserName,
  };
}
