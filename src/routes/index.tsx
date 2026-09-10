import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Flame, AlertTriangle } from "lucide-react";

import { Slide, Card, Metric, Note, Table, BarChart, Chips, Steps } from "@/components/deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auditoria de Conta & Plano de Mídia — Boi na Brasa" },
      {
        name: "description",
        content:
          "Auditoria da conta Meta Ads 570600535902915 (10/jun a 09/set/2026) e plano de mídia em dois eixos para o Boi na Brasa.",
      },
      { property: "og:title", content: "Auditoria de Conta & Plano de Mídia — Boi na Brasa" },
      {
        property: "og:description",
        content:
          "Diagnóstico da conta Meta Ads e plano de mídia em dois eixos: Aniversariantes e Público geral.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Deck,
});

const SLIDES = [
  "capa",
  "alerta",
  "metricas",
  "evolucao",
  "estrutura",
  "top9",
  "diagnostico",
  "plano",
  "eixos",
  "teste-ab",
  "lista-clientes",
  "eixo1-meta",
  "eixo1-google",
  "eixo2-meta",
  "eixo2-google",
  "cenarios",
  "expectativas",
  "proximos-passos",
  "fonte",
];

function Deck() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    const target = Math.max(0, Math.min(SLIDES.length - 1, i));
    document.getElementById(SLIDES[target])?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("data-slide");
            if (id) setActive(SLIDES.indexOf(id));
          }
        });
      },
      { threshold: 0.5 },
    );
    SLIDES.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goTo(active + 1);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <main className="relative bg-background">
      {/* Progresso */}
      <div className="fixed top-0 right-0 left-0 z-30 h-[3px] bg-surface-2">
        <div
          className="h-full bg-gradient-to-r from-ember to-flame transition-all duration-500"
          style={{ width: `${((active + 1) / SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Dots */}
      <nav
        aria-label="Navegação de slides"
        className="fixed top-1/2 right-3 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
      >
        {SLIDES.map((id, i) => (
          <button
            key={id}
            onClick={() => goTo(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={active === i}
            className={`h-2 rounded-full transition-all ${
              active === i ? "h-6 w-2 bg-ember" : "w-2 bg-muted-foreground/35 hover:bg-flame"
            }`}
          />
        ))}
      </nav>

      {/* Setas */}
      <div className="fixed right-4 bottom-4 z-30 flex items-center gap-2">
        <span className="mr-1 hidden font-display text-xs text-muted-foreground sm:inline">
          {active + 1} / {SLIDES.length}
        </span>
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Slide anterior"
          className="rounded-full border border-border bg-surface-2 p-2 text-foreground transition-colors hover:border-ember hover:text-ember"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => goTo(active + 1)}
          aria-label="Próximo slide"
          className="rounded-full border border-border bg-surface-2 p-2 text-foreground transition-colors hover:border-ember hover:text-ember"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div ref={containerRef} className="h-[100svh] snap-y snap-mandatory overflow-y-auto">
        {/* 1 — Capa */}
        <Slide id="capa" index={1} tone="cover">
          <div className="animate-rise">
            <p className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-flame uppercase">
              <Flame className="h-4 w-4" /> Boi na Brasa
            </p>
            <h1 className="font-display text-4xl leading-[1.05] font-extrabold text-foreground sm:text-6xl lg:text-7xl">
              Auditoria de Conta
              <br />
              <span className="bg-gradient-to-r from-ember to-flame bg-clip-text text-transparent">
                & Plano de Mídia
              </span>
            </h1>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Card>
                <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                  Conta Meta Ads
                </p>
                <p className="mt-1 font-display font-bold text-foreground">570600535902915</p>
              </Card>
              <Card>
                <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                  Período analisado
                </p>
                <p className="mt-1 font-display font-bold text-foreground">
                  10/jun/2026 a 09/set/2026
                </p>
                <p className="text-xs text-muted-foreground">3 meses</p>
              </Card>
              <Card>
                <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                  Fonte
                </p>
                <p className="mt-1 font-display font-bold text-foreground">Meta Ads Manager</p>
                <p className="text-xs text-muted-foreground">acesso ao vivo</p>
              </Card>
            </div>
          </div>
        </Slide>

        {/* 2 — Alerta crítico */}
        <Slide id="alerta" index={2} tone="alert" eyebrow="Alerta crítico">
          <div className="rounded-2xl border-2 border-destructive bg-destructive/10 p-6 sm:p-8">
            <p className="flex items-center gap-3 font-display text-2xl font-extrabold text-destructive sm:text-4xl">
              <AlertTriangle className="h-8 w-8 shrink-0" />
              Veiculação RESTRITA por falha de pagamento
            </p>
            <blockquote className="mt-6 border-l-2 border-destructive pl-4 text-base text-foreground italic sm:text-lg">
              “Seus anúncios não estão sendo veiculados porque não foi possível processar seu último
              pagamento.”
              <span className="mt-1 block text-xs text-muted-foreground not-italic">
                Mensagem exibida no Ads Manager
              </span>
            </blockquote>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Campanhas do período" value="59" hint="todas afetadas" tone="alert" />
            <Metric
              label="Status das campanhas"
              value="Erro no pagamento / Desativado"
              tone="alert"
            />
            <Metric label="Anúncios entregando agora" value="Nenhum" tone="alert" />
          </div>
          <Note>
            A conta não está entregando nenhum anúncio agora, independente de orçamento ou
            estratégia. Isso precisa ser resolvido <strong className="text-foreground">ANTES</strong>{" "}
            de qualquer escala de investimento — hoje é o maior gargalo da conta, maior que qualquer
            questão de criativo ou público.
          </Note>
        </Slide>

        {/* 3 — Métricas vitais */}
        <Slide id="metricas" index={3} eyebrow="Métricas vitais" title="Resultado dos 3 meses">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Valor investido" value="R$ 2.399,95" hint="~R$ 800/mês" tone="ember" />
            <Metric label="Impressões" value="424.642" />
            <Metric label="CPM" value="R$ 5,65" />
            <Metric label="Alcance (dedup.)" value="231.762" />
            <Metric label="Frequência" value="1,83" />
            <Metric label="Cliques no link" value="5.688" hint="CTR 1,34% · CPC R$ 0,42" />
            <Metric label="Cliques (todos)" value="8.293" hint="CTR 1,95% · CPC R$ 0,29" />
            <Metric
              label="Visualizações de LP"
              value="24"
              hint="Custo por visualização de LP: R$ 100,00"
              tone="alert"
            />
          </div>
          <Note>
            Orçamento pulverizado em 59 campanhas (média de R$ 40,68 por campanha em 3 meses) —
            fragmentação estrutural que impede o algoritmo de sair da fase de aprendizado. As 24
            visualizações de LP (vs. 8.293 cliques totais) mostram que quase todo o tráfego vai para
            engajamento/WhatsApp, não para um funil de conversão mensurável fora dele.
          </Note>
        </Slide>

        {/* 4 — Evolução mês a mês */}
        <Slide id="evolucao" index={4} eyebrow="Evolução" title="Mês a mês">
          <BarChart
            data={[
              { label: "Jun (10–30)", value: 5.85, display: "R$ 5,85" },
              { label: "Jul", value: 3.2, display: "R$ 3,20" },
              { label: "Ago", value: 10.0, display: "R$ 10,00" },
              { label: "Set (1–8)", value: 15.54, display: "R$ 15,54" },
            ]}
          />
          <Table
            head={[
              "Mês",
              "Investido",
              "Impressões",
              "CPM",
              "Cliques (link)",
              "CTR (link)",
              "CPC (link)",
            ]}
            highlight={1}
            rows={[
              ["Jun (10–30)", "R$ 371,26", "63.496", "R$ 5,85", "1.710", "2,69%", "R$ 0,22"],
              ["Jul (mês cheio)", "R$ 799,55", "249.966", "R$ 3,20", "2.268", "0,91%", "R$ 0,35"],
              ["Ago (mês cheio)", "R$ 899,89", "89.990", "R$ 10,00", "982", "1,09%", "R$ 0,92"],
              ["Set (1–8, parcial)", "R$ 329,25", "21.190", "R$ 15,54", "728", "3,44%", "R$ 0,45"],
            ]}
          />
          <Note>
            Julho foi o melhor mês de entrega (CPM R$ 3,20, mais baixo do trimestre, maior volume de
            impressões). A partir de agosto o CPM triplicou e em setembro quase quintuplicou vs.
            julho — sinal de perda de eficiência, agravado pela instabilidade de pagamento que
            culminou na restrição atual. Frequência baixa (1,83) indica que não é fadiga clássica de
            criativo, e sim instabilidade de entrega + público/orçamento por campanha insuficientes.
          </Note>
        </Slide>

        {/* 5 — Estrutura */}
        <Slide
          id="estrutura"
          index={5}
          eyebrow="Estrutura de campanhas"
          title="Fragmentação excessiva"
        >
          <p className="text-base text-muted-foreground">
            Das 59 campanhas, há duplicadas/quase-idênticas competindo pelo mesmo público:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card accent>
              <p className="font-display font-bold text-flame">Três variações de “casamento”</p>
              <p className="mt-2 text-sm text-muted-foreground">
                “casamento”, “casamento 2” e “RodizioAlmoçoPromo - Casamento” rodando em paralelo.
              </p>
            </Card>
            <Card accent>
              <p className="font-display font-bold text-flame">Duas campanhas “Mensagem”</p>
              <p className="mt-2 text-sm text-muted-foreground">
                “Mensagem” e “mensagem” disputando o mesmo público.
              </p>
            </Card>
            <Card accent>
              <p className="font-display font-bold text-flame">Várias com sufixo “— Cópia”</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Duplicações sem critério de teste ou corte.
              </p>
            </Card>
            <Card accent>
              <p className="font-display font-bold text-flame">Campanhas de 2024 ainda listadas</p>
              <p className="mt-2 text-sm text-muted-foreground">Desativadas, sem gasto.</p>
            </Card>
          </div>
          <Note>
            Sinal de ausência de arquitetura por funil (Topo/Meio/Fundo) — criação ad hoc por
            tema/data.
          </Note>
        </Slide>

        {/* 6 — Top 9 */}
        <Slide
          id="top9"
          index={6}
          eyebrow="Top 9 por investimento"
          title="~65% do gasto do trimestre"
        >
          <Table
            head={[
              "Campanha",
              "Objetivo",
              "Investido",
              "Resultado",
              "Custo/resultado",
              "Alcance",
              "Freq.",
            ]}
            rows={[
              [
                "Nova campanha de Tráfego",
                "Cliques no link",
                "R$ 324,14",
                "2.326 cliques",
                "R$ 0,14",
                "33.174",
                "1,45",
              ],
              [
                "Mensagem",
                "Conversa iniciada",
                "R$ 279,63",
                "347 conversas",
                "R$ 0,81",
                "9.601",
                "1,52",
              ],
              [
                "mensagem (desativada)",
                "Conversa iniciada",
                "R$ 222,07",
                "58 conversas",
                "R$ 3,83",
                "7.307",
                "1,99",
              ],
              [
                "casamento 2",
                "Conversa iniciada",
                "R$ 169,63",
                "60 conversas",
                "R$ 2,83",
                "3.746",
                "1,64",
              ],
              [
                "casamento",
                "Conversa iniciada",
                "R$ 163,50",
                "80 conversas",
                "R$ 2,04",
                "3.463",
                "1,71",
              ],
              [
                "RodizioAlmoçoPromo - Casamento",
                "Alcance",
                "R$ 110,56",
                "63.398 alcance",
                "R$ 1,74/mil",
                "63.398",
                "1,35",
              ],
              [
                "Post sábado/domingo férias",
                "Conversa iniciada",
                "R$ 104,75",
                "19 conversas",
                "R$ 5,51",
                "5.715",
                "1,83",
              ],
              [
                "DHComunicação - Panfletagem (desativada)",
                "Cliques no link",
                "R$ 102,74",
                "631 cliques",
                "R$ 0,16",
                "14.945",
                "1,12",
              ],
              [
                "servidor público",
                "Alcance",
                "R$ 90,82",
                "52.343 alcance",
                "R$ 1,74/mil",
                "52.343",
                "1,29",
              ],
            ]}
          />
          <Note>
            Custo por conversa iniciada varia de R$ 0,81 a R$ 5,51 entre campanhas — quase 7x de
            diferença. Sinal de públicos/criativos muito desiguais, testados sem critério de corte
            (caras seguem ativas junto das baratas).
          </Note>
        </Slide>

        {/* 7 — Diagnóstico */}
        <Slide id="diagnostico" index={7} eyebrow="Diagnóstico" title="Decisão: começar do zero">
          <div className="rounded-2xl border-2 border-ember bg-ember/10 p-6 sm:p-8">
            <p className="font-display text-2xl font-extrabold text-flame sm:text-3xl">
              TODAS as 59 campanhas serão pausadas/encerradas
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base">
              Dada a fragmentação, sujeira de conta e instabilidade de entrega, a decisão é NÃO
              manter, otimizar ou escalar nenhuma campanha existente. A operação recomeça do zero
              assim que o pagamento for resolvido, seguindo exclusivamente a arquitetura por eixos
              (Aniversariantes e Público geral) — sem herdar estrutura, nomenclatura ou configuração
              antiga.
            </p>
          </div>
          <Note>
            Isso vale inclusive para as campanhas de melhor desempenho histórico (ex.: “Nova campanha
            de Tráfego” a R$ 0,14/clique, “Mensagem” a R$ 0,81/conversa) — o aprendizado fica
            registrado e informa criativos/públicos novos, mas a execução é 100% nova.
          </Note>
        </Slide>

        {/* 8 — Plano de mídia */}
        <Slide id="plano" index={8} eyebrow="Plano de mídia" title="Visão geral">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card accent>
              <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                Meta do cliente
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground sm:text-base">
                Gerar leads e reservas qualificadas para sustentar a meta de{" "}
                <strong className="text-flame">R$ 300 mil incrementais/mês</strong>, alinhada ao
                objetivo geral de <strong className="text-flame">R$ 1 milhão/mês</strong> do Boi na
                Brasa.
              </p>
            </Card>
            <Card accent>
              <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                Pré-requisito não negociável
              </p>
              <p className="mt-2 text-sm leading-relaxed text-destructive sm:text-base">
                Resolver a restrição de pagamento antes de qualquer investimento dos cenários.
              </p>
            </Card>
          </div>
          <Note>
            Hoje o investimento médio em Meta é de ~R$ 800/mês e não há investimento estruturado em
            Google Ads — os cenários representam um salto relevante e as projeções são estimativas
            direcionais, não garantias.
          </Note>
        </Slide>

        {/* 9 — Dois eixos */}
        <Slide
          id="eixos"
          index={9}
          eyebrow="Dois eixos de comunicação"
          title="Rodando em paralelo em Google Ads e Meta Ads"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Card accent>
              <p className="font-display text-xl font-bold text-flame">
                Eixo 1 — Aniversariantes
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Fazer o restaurante ser a escolha de quem vai comemorar aniversário (grupos
                pequenos/médios), capturando base conhecida e novas pessoas com intenção de
                comemorar.
              </p>
              <p className="mt-4 text-sm text-foreground">
                <span className="text-ember">Papel no funil:</span> fundo/meio — alta intenção,
                ticket previsível.
              </p>
            </Card>
            <Card accent>
              <p className="font-display text-xl font-bold text-flame">
                Eixo 2 — Público geral (volume)
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Aumentar o volume total de pessoas que vão ao restaurante (almoço, jantar, ocasiões
                diversas), ampliando a base além de quem procura especificamente por evento.
              </p>
              <p className="mt-4 text-sm text-foreground">
                <span className="text-ember">Papel no funil:</span> topo/meio — reconhecimento e
                aquisição ampla.
              </p>
            </Card>
          </div>
        </Slide>

        {/* 10 — Teste A/B */}
        <Slide
          id="teste-ab"
          index={10}
          eyebrow="Teste A/B de destino do lead"
          title="WhatsApp vs. WalkIn"
        >
          <p className="text-sm text-muted-foreground sm:text-base">
            Em ambos os eixos e nas duas plataformas, metade do tráfego de conversão vai para
            WhatsApp (fluxo atual) e a outra metade vai direto para a plataforma de reservas WalkIn.
            Estrutura: duplicar o anúncio de melhor desempenho em 2 variações idênticas em criativo,
            mudando apenas o destino do clique.
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card accent>
              <p className="font-display font-bold text-flame">Variação A — WhatsApp</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Objetivo Mensagens no Meta / CTA WhatsApp no Google.
              </p>
            </Card>
            <Card accent>
              <p className="font-display font-bold text-flame">Variação B — WalkIn</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Objetivo Conversões/tráfego para link no Meta, campanha de Pesquisa com conversão de
                formulário no Google.
              </p>
            </Card>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Divisão" value="50/50" hint="mínimo 3–4 semanas ou ~50 conversões por variação" />
            <Metric
              label="Métrica de decisão"
              value="Custo por reserva confirmada"
              hint="não custo por clique/conversa isolado"
              tone="ember"
            />
            <Metric
              label="Canal secundário"
              value="10–15% do orçamento"
              hint="aprendizado contínuo"
              tone="success"
            />
          </div>
          <Note>
            WhatsApp tende a CPA de contato mais barato mas mais abandono/no-show; WalkIn pode
            converter menos cliques mas gerar reservas mais “limpas”. Requer rastreamento de
            conversão confirmada dentro do WalkIn (pixel/API de conversão). Depois do teste, o canal
            vencedor (ou combinação ideal por eixo) recebe a maior parte do orçamento, mantendo
            10–15% no canal secundário para aprendizado contínuo.
          </Note>
        </Slide>

        {/* 11 — Lista de clientes */}
        <Slide
          id="lista-clientes"
          index={11}
          eyebrow="Uso da lista de clientes"
          title="Dado próprio — 103 páginas de cadastro"
        >
          <Steps
            items={[
              <>
                <strong className="text-foreground">Exclusão</strong> — clientes que foram ao
                restaurante nos últimos 60 dias são excluídos das campanhas do Eixo 2, para não
                pagar por quem já é cliente.
              </>,
              <>
                <strong className="text-foreground">Público de aniversariantes (Eixo 1)</strong> — o
                Meta Ads tem segmentação demográfica{" "}
                <strong className="text-flame">NATIVA “Aniversariantes deste mês”</strong>, direto na
                configuração de público do conjunto de anúncios, sem depender de upload de lista — é
                a base do Eixo 1 no Meta. O Google Ads não tem esse filtro nativo, então lá o
                processo continua operacional: extrair mensalmente os clientes com aniversário no mês
                seguinte e subir via Customer Match.
              </>,
              <>
                <strong className="text-foreground">Base para expansão</strong> — a lista completa
                alimenta lookalike no Meta e sinais de público no Google (Customer Match em
                Performance Max/Demand Gen).
              </>,
            ]}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <p className="font-display font-bold text-flame">Como subir — Meta</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Meta Ads Manager → Públicos → Criar público personalizado → Lista de clientes
                (telefone, e-mail, data de nascimento, nome).
              </p>
            </Card>
            <Card>
              <p className="font-display font-bold text-flame">Como subir — Google</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Google Ads → Biblioteca compartilhada → Gerenciador de público-alvo → Seus dados →
                Lista de clientes (Customer Match); telefone tem a maior taxa de correspondência no
                Brasil.
              </p>
            </Card>
          </div>
          <div className="rounded-xl border-l-2 border-destructive bg-surface-2 p-5 text-sm text-muted-foreground">
            <strong className="text-destructive">Atenção LGPD:</strong> usar apenas dados já
            fornecidos pelo cliente ao reservar/cadastrar, informar que podem ser usados para
            marketing, nunca misturar com listas de terceiros.
          </div>
        </Slide>

        {/* 12 — Eixo 1 Meta */}
        <Slide id="eixo1-meta" index={12} eyebrow="Eixo 1 — Aniversariantes" title="Meta Ads">
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Campanhas" value="1" />
            <Metric label="Objetivo" value="Mensagens (WhatsApp)" tone="ember" />
            <Metric label="Orçamento" value="CBO" hint="nível da campanha · 4 conjuntos" />
          </div>
          <Table
            head={["Conjunto", "Público-alvo", "Papel"]}
            rows={[
              [
                "AS1 — Aniversariantes deste mês (nativo Meta)",
                "Segmentação demográfica nativa “Aniversariantes deste mês” + geolocalização (raio 8–10 km, vetor norte de BH + Venda Nova) + classe B/C",
                "Prospecção de alta relevância, sem depender de upload",
              ],
              [
                "AS2 — Lista de clientes (aniversariantes do mês, base própria)",
                "Público personalizado subido mensalmente (aniversário no mês seguinte)",
                "Reativação da base conhecida — maior intenção, menor CPA esperado",
              ],
              [
                "AS3 — Lookalike de aniversariantes",
                "Lookalike 1–3% a partir de clientes que já comemoraram aniversário no restaurante",
                "Prospecção de alta relevância a partir de dado próprio",
              ],
              [
                "AS4 — Interesse + geolocalização",
                "20–55 anos, raio 8–10 km, classe B/C, interesses em “aniversário”, “festa de aniversário”, “comemoração”, “restaurantes”",
                "Camada complementar de prospecção ampla",
              ],
            ]}
          />
          <Note>
            <strong className="text-foreground">Criativos:</strong> vídeo/carrossel do espaço
            decorado, “sobremesa grátis no seu aniversário”, depoimento de cliente comemorando, CTA
            direto para WhatsApp (“Reserve sua mesa de aniversário”).
          </Note>
        </Slide>

        {/* 13 — Eixo 1 Google */}
        <Slide id="eixo1-google" index={13} eyebrow="Eixo 1 — Aniversariantes" title="Google Ads">
          <Card accent>
            <p className="text-sm text-muted-foreground sm:text-base">
              Campanha de Pesquisa, estratégia{" "}
              <strong className="text-flame">“Maximizar conversões”</strong> (meta de CPA após 2–3
              semanas), segmentada no raio de atuação (Venda Nova + vetor norte de BH).
            </p>
          </Card>
          <Table
            head={["Grupo", "Termos de pesquisa positivos"]}
            rows={[
              [
                "Restaurante para aniversário",
                "“restaurante para comemorar aniversário”, “onde comemorar aniversário em bh”, “restaurante para aniversário perto de mim”, “restaurante para festa de aniversário”, “onde fazer aniversário em grupo bh”",
              ],
              [
                "Espaço/salão para aniversário adulto",
                "“espaço para comemorar aniversário bh”, “salão de festas para aniversário adulto”, “casa para aniversário adulto venda nova”, “buffet para aniversário adulto bh”",
              ],
              [
                "Rodízio/churrascaria para aniversário",
                "“rodízio para aniversário”, “churrascaria para aniversário”, “restaurante rodízio para comemorar aniversário”, “restaurante para comemorar aniversário com amigos”",
              ],
            ]}
          />
          <div>
            <p className="mb-3 text-[0.7rem] font-semibold tracking-wider text-destructive uppercase">
              Palavras-chave negativas
            </p>
            <Chips
              items={[
                "infantil",
                "festa infantil",
                "buffet infantil",
                "criança",
                "decoração infantil",
                "recreação",
                "aniversário de 1 ano",
                "kit festa",
                "salgadinho",
                "bolo caseiro",
                "receita de bolo",
                "emprego",
                "vaga",
                "trabalhe conosco",
                "grátis",
                "curso",
                "como fazer",
                "receita",
                "aluguel de espaço",
              ]}
            />
          </div>
          <Note>
            <strong className="text-foreground">Sinal de público adicional:</strong> Customer Match
            (mesma lista do mês usada no Meta) como público de observação na campanha de Pesquisa, e
            como segmentação em campanha complementar de Demand Gen/Display com os mesmos criativos
            do Meta.
          </Note>
        </Slide>

        {/* 14 — Eixo 2 Meta */}
        <Slide id="eixo2-meta" index={14} eyebrow="Eixo 2 — Público geral" title="Meta Ads">
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Campanhas" value="1" hint="CBO" />
            <Metric label="Objetivo" value="Misto Tráfego/Mensagens" tone="ember" />
            <Metric label="Conjuntos" value="3" />
          </div>
          <Table
            head={["Conjunto", "Público-alvo", "Papel"]}
            rows={[
              [
                "AS1 — Lookalike de clientes (base geral)",
                "Lookalike 1–5% de toda a lista de clientes",
                "Prospecção qualificada, dado próprio",
              ],
              [
                "AS2 — Geolocalização + interesse amplo",
                "Raio 10–12 km, 18–65 anos, classe B/C, interesses em “churrascaria”, “rodízio”, “gastronomia”, “restaurantes em Belo Horizonte”",
                "Alcance de aquisição, maior volume",
              ],
              [
                "AS3 — Retargeting",
                "Engajaram com Instagram/Facebook, visitaram perfil ou iniciaram conversa sem concluir reserva nos últimos 30–60 dias",
                "Recuperação de intenção já demonstrada",
              ],
            ]}
          />
          <div className="rounded-xl border-l-2 border-ember bg-surface-2 p-5 text-sm text-muted-foreground">
            <strong className="text-flame">Exclusão obrigatória em AS1/AS2:</strong> clientes
            recentes (últimos 60 dias), para focar aquisição em gente nova.
          </div>
          <Note>
            <strong className="text-foreground">Criativos:</strong> foco institucional — nota 4.8 no
            Google, preço R$ 99 com sobremesa inclusa, ambiente/estrutura, garçom Ricardo como
            protagonista.
          </Note>
        </Slide>

        {/* 15 — Eixo 2 Google */}
        <Slide id="eixo2-google" index={15} eyebrow="Eixo 2 — Público geral" title="Google Ads">
          <Card accent>
            <p className="text-sm text-muted-foreground sm:text-base">
              Campanha de Pesquisa (intenção ativa) + Performance Max (lista de clientes como sinal
              de público, alcance em Display/YouTube/Gmail/Maps com o mesmo orçamento de aquisição).
            </p>
          </Card>
          <Table
            head={["Grupo", "Termos de pesquisa positivos"]}
            rows={[
              [
                "Rodízio/churrascaria região",
                "“rodízio venda nova”, “churrascaria venda nova”, “melhor churrascaria zona norte bh”, “churrascaria perto de mim”, “rodízio de carnes bh”",
              ],
              [
                "Restaurante geral",
                "“restaurante rodízio bh”, “restaurante rodízio perto de mim”, “onde comer bem em venda nova”, “restaurante para almoço em família bh”, “restaurante para grupo grande bh”",
              ],
              [
                "Diferencial de preço/oferta",
                "“rodízio com sobremesa incluída”, “rodízio barato bh”, “rodízio com preço fixo bh”",
              ],
            ]}
          />
          <div>
            <p className="mb-3 text-[0.7rem] font-semibold tracking-wider text-destructive uppercase">
              Palavras-chave negativas
            </p>
            <Chips
              items={[
                "receita",
                "como fazer churrasco",
                "churrasqueira",
                "carvão",
                "espeto (venda)",
                "curso de churrasco",
                "emprego",
                "vaga",
                "trabalhe conosco",
                "franquia",
                "como abrir uma churrascaria",
                "delivery",
                "grátis",
                "açougue",
                "carne para comprar",
                "supermercado",
                "atacado",
              ]}
            />
          </div>
          <Note>
            <strong className="text-foreground">Segmentação geográfica:</strong> Venda Nova,
            Pampulha, vetor norte, e cidades próximas como Pedro Leopoldo, Vespasiano, Confins.
          </Note>
        </Slide>

        {/* 16 — Cenários */}
        <Slide id="cenarios" index={16} eyebrow="Cenários de orçamento" title="Cenário A e Cenário B">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card accent>
              <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                Cenário A
              </p>
              <p className="mt-2 font-display text-4xl font-extrabold text-flame">
                R$ 3.000<span className="text-xl">/mês</span>
              </p>
            </Card>
            <Card accent>
              <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                Cenário B
              </p>
              <p className="mt-2 font-display text-4xl font-extrabold text-flame">
                R$ 5.000<span className="text-xl">/mês</span>
              </p>
            </Card>
          </div>
          <Note>
            Os dois seguem a mesma arquitetura (2 eixos × 2 plataformas × teste A/B WhatsApp/WalkIn).
            A distribuição do orçamento não é fixada previamente: será calibrada a partir do
            desempenho real das primeiras semanas e ajustada de forma dinâmica.
          </Note>
          <Card>
            <p className="font-display font-bold text-flame">
              No Cenário B, o incremento de R$ 2.000 é direcionado a:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:text-base">
              <li className="flex gap-3">
                <span className="text-ember">—</span> ampliar a cobertura de Performance Max no
                Google;
              </li>
              <li className="flex gap-3">
                <span className="text-ember">—</span> rodar testes A/B de criativo mais robustos no
                Meta;
              </li>
              <li className="flex gap-3">
                <span className="text-ember">—</span> expandir a camada de Display/Demand Gen do Eixo
                1 quando a lista de clientes estiver madura o suficiente.
              </li>
            </ul>
          </Card>
        </Slide>

        {/* 17 — Expectativas */}
        <Slide id="expectativas" index={17} eyebrow="Expectativas" title="Resultado realista">
          <Note>
            A conta Meta hoje gera em média 347 conversas/mês na melhor campanha (R$ 0,81/conversa) e
            o Google Ads não tem histórico nesta conta — as projeções são direcionais e devem ser
            recalibradas após 4 semanas de dados reais.
          </Note>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card accent>
              <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                Cenário A — R$ 3.000/mês
              </p>
              <p className="mt-3 font-display text-2xl font-bold text-flame">
                550 a 950 conversas/cliques qualificados
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                somando as duas plataformas e os dois eixos
              </p>
              <p className="mt-4 text-sm text-foreground">
                Com taxa de conversão de contato→reserva de 15–20%:{" "}
                <strong className="text-success">≈ 85 a 190 reservas/leads qualificados por mês</strong>
                .
              </p>
            </Card>
            <Card accent>
              <p className="text-[0.7rem] tracking-wider text-muted-foreground uppercase">
                Cenário B — R$ 5.000/mês
              </p>
              <p className="mt-3 font-display text-2xl font-bold text-success">
                ≈ 170 a 300 reservas/leads qualificados por mês
              </p>
            </Card>
          </div>
        </Slide>

        {/* 18 — Próximos passos */}
        <Slide id="proximos-passos" index={18} eyebrow="Próximos passos" title="Recomendados">
          <Steps
            items={[
              <>
                <strong className="text-destructive">Resolver o pagamento da conta hoje</strong> —
                prioridade máxima.
              </>,
              <>Pausar/encerrar todas as 59 campanhas existentes.</>,
              <>
                Implementar rastreamento de conversão de conversa→reserva (mesmo manual/planilha no
                início).
              </>,
              <>
                Extrair a base de clientes e estruturar a rotina mensal de upload (lista geral +
                lista de aniversariantes do mês seguinte), já no Cenário A.
              </>,
              <>
                Revisão semanal de custo por resultado nas primeiras 4 semanas, com corte de
                campanhas acima de R$ 2,50–3,00/conversa.
              </>,
            ]}
          />
        </Slide>

        {/* 19 — Fonte */}
        <Slide id="fonte" index={19} tone="cover">
          <div className="text-center">
            <Flame className="mx-auto h-10 w-10 text-ember" />
            <p className="mt-6 font-display text-2xl leading-relaxed font-bold text-foreground sm:text-3xl">
              Auditoria realizada com dados extraídos diretamente do Meta Ads Manager
            </p>
            <p className="mt-4 text-sm text-muted-foreground sm:text-base">
              Conta 570600535902915 · extração em 10/set/2026 · período de 10/jun a 09/set/2026.
            </p>
          </div>
        </Slide>
      </div>
    </main>
  );
}
