import { useState, type FormEvent } from "react";
import { Flame, HeartHandshake, Send, Shield } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { InputField, TextAreaField } from "../../components/ui/FormField";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { formatCompactDate } from "../../lib/date";
import type { CreatePrayerRequestInput } from "../../hooks/usePrayerRequests";
import type { PrayerRequest } from "../../types/domain";

type PrayerRequestsProps = {
  requests: PrayerRequest[];
  error?: string | null;
  onCreate: (input: CreatePrayerRequestInput) => boolean | void | Promise<boolean | void>;
  onMarkPraying: (id: string) => void;
  hasPrayed: (id: string) => boolean;
};

const categoryLabel: Record<PrayerRequest["category"], string> = {
  familia: "Família",
  saude: "Saúde",
  direcao: "Direção",
  gratidao: "Gratidão",
  outro: "Pedido",
};

export function PrayerRequests({
  requests,
  error: persistenceError,
  onCreate,
  onMarkPraying,
  hasPrayed,
}: PrayerRequestsProps) {
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formError, setFormError] = useState("");
  const [burstId, setBurstId] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!request.trim()) {
      setFormError("Escreva o pedido antes de enviar.");
      return;
    }

    const wasCreated = await onCreate({ name, request, isAnonymous });

    if (wasCreated === false) {
      return;
    }

    setName("");
    setRequest("");
    setIsAnonymous(false);
    setFormError("");
  };

  const handlePraying = (id: string) => {
    if (hasPrayed(id)) {
      return;
    }

    onMarkPraying(id);
    setBurstId(id);
    window.setTimeout(() => setBurstId((current) => (current === id ? null : current)), 860);
  };

  return (
    <div className="mx-auto grid max-w-[1400px] gap-5 xl:grid-cols-[420px_1fr]">
      <section className="xl:sticky xl:top-8 xl:self-start">
        <Card className="hatch-panel">
          <SectionHeader
            eyebrow="Pedidos de oração"
            title="Coloque a semana diante de Deus."
            description="O nome é opcional. O pedido fica visível para a célula orar junto."
          />

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
            <InputField
              id="prayer-name"
              label="Nome"
              helper="Deixe em branco se preferir."
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <TextAreaField
              id="prayer-request"
              label="Pedido"
              error={formError}
              required
              value={request}
              onChange={(event) => {
                setRequest(event.target.value);
                if (formError) {
                  setFormError("");
                }
              }}
            />

            {persistenceError ? (
              <p className="rounded-[8px] border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm leading-5 text-red-100">
                {persistenceError}
              </p>
            ) : null}

            <label className="flex items-start gap-3 rounded-[8px] border border-ash-100/10 bg-coal-950/40 p-3 text-sm text-ash-300">
              <input
                className="mt-1 size-4 accent-ember-400"
                type="checkbox"
                checked={isAnonymous}
                onChange={(event) => setIsAnonymous(event.target.checked)}
              />
              <span>
                <span className="block font-semibold text-ash-100">Enviar como anônimo</span>
                <span className="mt-1 block text-xs leading-5 text-ash-500">
                  O pedido aparece sem identificação na lista.
                </span>
              </span>
            </label>

            <Button
              variant="primary"
              icon={<Send className="size-4" strokeWidth={1.8} />}
              type="submit"
              fullWidth
            >
              Enviar pedido
            </Button>
          </form>
        </Card>
      </section>

      <section>
        <SectionHeader
          title="Pedidos da semana"
          description="Toque em Estou orando para sinalizar cobertura e encorajar quem pediu."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {requests.map((prayerRequest) => {
            const alreadyPrayed = hasPrayed(prayerRequest.id);

            return (
              <Card key={prayerRequest.id} className="relative flex min-h-64 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <Badge tone={prayerRequest.category === "gratidao" ? "moss" : "quiet"}>
                      {categoryLabel[prayerRequest.category]}
                    </Badge>
                    {prayerRequest.isAnonymous ? (
                      <Shield className="size-4 text-ash-500" strokeWidth={1.8} />
                    ) : null}
                  </div>

                  <p className="mt-5 text-base leading-7 text-ash-100">
                    {prayerRequest.request}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ash-100/10 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-ash-200">
                      {prayerRequest.isAnonymous
                        ? "Pedido anônimo"
                        : prayerRequest.name ?? "Sem nome"}
                    </p>
                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ash-500">
                      {formatCompactDate(prayerRequest.createdAt)}
                    </p>
                  </div>

                  <div className="relative">
                    {burstId === prayerRequest.id ? <span className="prayer-burst" /> : null}
                    <Button
                      variant={alreadyPrayed ? "secondary" : "ember"}
                      icon={
                        alreadyPrayed ? (
                          <HeartHandshake className="size-4" strokeWidth={1.8} />
                        ) : (
                          <Flame className="size-4" strokeWidth={1.8} />
                        )
                      }
                      disabled={alreadyPrayed}
                      onClick={() => handlePraying(prayerRequest.id)}
                    >
                      {alreadyPrayed
                        ? `Você já está orando · ${prayerRequest.prayingCount}`
                        : `Estou orando · ${prayerRequest.prayingCount}`}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
