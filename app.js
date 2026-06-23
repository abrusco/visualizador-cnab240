const state = { records: [], filteredIndexes: [], summary: null, pageSize: 100, page: 1, worker: null, sortField: null, sortOrder: "asc" };

const el = {
  fileInput: document.getElementById("fileInput"),
  clearBtn: document.getElementById("clearBtn"),
  status: document.getElementById("status"),
  progressBar: document.getElementById("progressBar"),
  summary: document.getElementById("summary"),
  filterField: document.getElementById("filterField"),
  filterValue: document.getElementById("filterValue"),
  onlyErrors: document.getElementById("onlyErrors"),
  resultsBody: document.getElementById("resultsBody"),
  resultInfo: document.getElementById("resultInfo"),
  pageInfo: document.getElementById("pageInfo"),
  prevPageBtn: document.getElementById("prevPageBtn"),
  nextPageBtn: document.getElementById("nextPageBtn"),
  pageSize: document.getElementById("pageSize"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  themeSelect: document.getElementById("themeSelect"),
  toggleImportPanelBtn: document.getElementById("toggleImportPanelBtn"),
  importPanelContent: document.getElementById("importPanelContent"),
  toggleSummaryPanelBtn: document.getElementById("toggleSummaryPanelBtn"),
  summaryPanelContent: document.getElementById("summaryPanelContent"),
  tableHeaders: document.querySelectorAll("thead th[data-sort]"),
  tooltip: document.getElementById("tooltip"),
  modalOverlay: document.getElementById("modalOverlay"),
  modalContent: document.getElementById("modalContent"),
  closeModalBtn: document.getElementById("closeModalBtn"),
};

const currencyBRL = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v || 0);
const text = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const setStatus = (msg) => (el.status.textContent = msg);
const isFileProtocol = window.location.protocol === "file:";
const themeStorageKey = "cnab240.theme";
const importPanelStorageKey = "cnab240.importPanelCollapsed";
const summaryPanelStorageKey = "cnab240.summaryPanelCollapsed";
const availableThemes = ["profissional", "claro", "colorido", "escuro", "moderno", "grafite", "aurora"];

function applyTheme(themeName) {
  const theme = availableThemes.includes(themeName) ? themeName : "profissional";
  document.body.setAttribute("data-theme", theme);
  el.themeSelect.value = theme;
  localStorage.setItem(themeStorageKey, theme);
}

function setPanelCollapsed({ button, content, storageKey, collapsed, expandLabel, collapseLabel }) {
  content.hidden = collapsed;
  button.classList.toggle("is-collapsed", collapsed);
  button.setAttribute("aria-label", collapsed ? expandLabel : collapseLabel);
  localStorage.setItem(storageKey, collapsed ? "1" : "0");
}

function setImportPanelCollapsed(collapsed) {
  setPanelCollapsed({
    button: el.toggleImportPanelBtn,
    content: el.importPanelContent,
    storageKey: importPanelStorageKey,
    collapsed,
    expandLabel: "Expandir importação",
    collapseLabel: "Ocultar importação",
  });
}

function setSummaryPanelCollapsed(collapsed) {
  setPanelCollapsed({
    button: el.toggleSummaryPanelBtn,
    content: el.summaryPanelContent,
    storageKey: summaryPanelStorageKey,
    collapsed,
    expandLabel: "Expandir painel de resumo e pesquisa",
    collapseLabel: "Ocultar painel de resumo e pesquisa",
  });
}

function getDisplayedFilePath(file) {
  const rawValue = (el.fileInput.value || "").trim();
  if (rawValue) return rawValue;
  return file?.name || "";
}

const retornoDescricao = {
  "00": "Pagamento Efetuado",
  "01": "Insuficiencia de Fundos - Debito Nao Efetuado",
  "02": "Credito ou Debito Cancelado pelo Pagador/Credor",
  "03": "Debito Autorizado pela Agencia - Efetuado",
  "AA": "Controle Invalido",
  "AB": "Tipo de Operacao Invalido",
  "AC": "Tipo de Servico Invalido",
  "AD": "Forma de Lancamento Invalida",
  "AE": "Tipo/Numero de Inscricao Invalido",
  "AF": "Codigo de Convenio Invalido",
  "AG": "Agencia/Conta Corrente/DV Invalido",
  "AH": "No Sequencial do Registro no Lote Invalido",
  "AI": "Codigo de Segmento de Detalhe Invalido",
  "AJ": "Tipo de Movimento Invalido",
  "AK": "Codigo da Camara de Compensacao do Banco Favorecido Invalido",
  "AL": "Codigo do Banco Favorecido ou Depositario Invalido",
  "AM": "Agencia do Favorecido Invalida",
  "AN": "Conta Corrente/DV do Favorecido Invalido",
  "AO": "Nome do Favorecido Nao Informado",
  "AP": "Data Lancamento Invalido",
  "AQ": "Tipo/Quantidade da Moeda Invalido",
  "AR": "Valor do Lancamento Invalido",
  "AS": "Numero do Documento do Lote (Seu Numero) Invalido",
  "AT": "Numero do Documento da Empresa (Nosso Numero) Invalido",
  "AU": "Data do Vencimento Invalida",
  "AV": "Valor do Titulo Invalido",
  "AW": "Valor do Desconto Invalido",
  "AX": "Valor da Mora Invalido",
  "AY": "Valor da Multa Invalido",
  "AZ": "Conta substituida",
  "BD": "Confirmacao de Baixa",
  "BE": "Baixa por Devolucao",
  "BF": "Baixa por Cancelamento",
  "BG": "Baixa por Pagamento",
  "BH": "Baixa por Decurso de Prazo",
  "BI": "Baixa por Protesto",
  "BJ": "Baixa por Outros Motivos",
  "BK": "Baixa por Mudanca de Status",
  "BL": "Baixa por Transferencia",
  "BM": "Baixa por Substituicao",
  "BN": "Baixa por Reforma",
  "BO": "Baixa por Devolucao Parcial",
  "BP": "Baixa por Devolucao Total",
  "BQ": "Baixa por Devolucao Interna",
  "BR": "Baixa por Devolucao Externa",
  "BS": "Baixa por Devolucao Administrativa",
  "BT": "Baixa por Devolucao por Erro",
  "BU": "Baixa por Devolucao por Rejeicao",
  "BV": "Baixa por Devolucao por Falta de Fundos",
  "BW": "Baixa por Devolucao por Conta Encerrada",
  "BX": "Baixa por Devolucao por Outros Motivos",
  "BY": "Baixa por Devolucao por Mudanca de Status",
  "BZ": "Baixa por Devolucao por Transferencia",
  "CA": "Codigo de Carteira Invalido",
  "CB": "Codigo de Agencia/Conta Corrente Invalido",
  "CC": "Codigo de Nosso Numero Invalido",
  "CD": "Codigo de Especie de Titulo Invalido",
  "CE": "Codigo de Aceite Invalido",
  "CF": "Codigo de Data de Emissao Invalido",
  "CG": "Codigo de Data de Vencimento Invalido",
  "CH": "Codigo de Valor de Titulo Invalido",
  "CI": "Codigo de Valor de Juros Invalido",
  "CJ": "Codigo de Valor de Multa Invalido",
  "CK": "Codigo de Valor de Desconto Invalido",
  "CL": "Codigo de Valor de Abatimento Invalido",
  "CM": "Codigo de Valor de IOF Invalido",
  "CN": "Codigo de Valor de Outras Despesas Invalido",
  "CO": "Codigo de Valor de Abatimento/Desconto Invalido",
  "CP": "Codigo de Valor de Mora/Multa Invalido",
  "CQ": "Codigo de Valor de Outros Acrescimos Invalido",
  "CR": "Codigo de Valor de Outros Decrescimos Invalido",
  "HA": "Lote Nao Aceito",
  "HB": "Registro Nao Aceito",
  "HC": "Lote Aceito",
  "HD": "Registro Aceito",
  "HE": "Lote Rejeitado",
  "HF": "Registro Rejeitado",
  "HG": "Lote Alterado",
  "HH": "Registro Alterado",
  "HI": "Lote Excluido",
  "HJ": "Registro Excluido",
  "HK": "Lote Incluido",
  "HL": "Registro Incluido",
  "HM": "Lote Processado",
  "HN": "Registro Processado",
  "HO": "Lote Nao Processado",
  "HP": "Registro Nao Processado",
  "HQ": "Lote em Processamento",
  "HR": "Registro em Processamento",
  "HS": "Lote Pendente",
  "HT": "Registro Pendente",
  "HU": "Lote em Analise",
  "HV": "Registro em Analise",
  "HW": "Lote em Aprovacao",
  "HX": "Registro em Aprovacao",
  "HY": "Lote em Liberacao",
  "HZ": "Registro em Liberacao",
};

const tipoServicoDescricao = {
  "01": "Cobranca",
  "03": "Boleto",
  "04": "Conciliacao",
  "05": "Debitos",
  "20": "Fornecedor",
  "22": "Tributos",
  "30": "Salarios",
  "32": "Honorarios",
  "33": "Bolsa auxilio",
  "50": "Sinistros",
  "75": "Credenciados",
  "77": "Remuneracao",
  "90": "Beneficios",
  "98": "Diversos",
};

const formaLancamentoDescricao = {
  "01": "Credito em Conta Corrente",
  "02": "Cheque Pagamento / Administrativo",
  "03": "DOC / TED",
  "05": "Credito em Conta Poupanca",
  "10": "OP - Ordem de Pagamento",
  "11": "Pagamento de Contas e Tributos com Codigo de Barras",
  "16": "Tributos - DARF Normal",
  "17": "Tributos - GPS (Guia da Previdencia Social)",
  "18": "Tributos - DARF Simples",
  "19": "Tributos - IPTU",
  "20": "Pagamento com Cheque",
  "30": "Liquidacao de Titulos do Proprio Banco",
  "31": "Liquidacao de Titulos de Outros Bancos",
  "40": "Extrato de Conta Corrente",
  "41": "TED Interna",
  "43": "TED Externa",
  "44": "DOC Interno",
  "45": "DOC Externo",
  "50": "Debito em Conta Corrente",
  "70": "Pagamento de Salarios",
  "71": "Pagamento de Honorarios",
  "72": "Pagamento de Bolsa Auxilio",
  "73": "Pagamento de Reembolso",
  "80": "Pagamento de Tributos",
  "81": "Pagamento de Contas e Tributos com Codigo de Barras",
};

const fw = (line, start, length) => line.slice(start - 1, start - 1 + length);
const numberFromCents = (raw) => {
  const digits = String(raw || "").replace(/\D/g, "");
  return digits ? Number(digits) / 100 : 0;
};
const formatDate8 = (raw) => (/^\d{8}$/.test(raw) ? `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4, 8)}` : "");

function renderSummary() {
  const s = state.summary || {};
  el.summary.innerHTML = `<div><dt>Empresa</dt><dd>${text(s.empresa || "-")}</dd></div>
    <div><dt>Convenio</dt><dd>${text(s.convenio || "-")}</dd></div>
    <div><dt>NSA</dt><dd>${text(s.nsa || "-")}</dd></div>
    <div><dt>Total de pagamentos</dt><dd>${text(s.totalPagamentos || 0)}</dd></div>
    <div><dt>Valor total</dt><dd>${text(currencyBRL(s.valorTotal || 0))}</dd></div>`;
}

function computeFilteredIndexes() {
  const field = el.filterField.value;
  const q = el.filterValue.value.trim().toLowerCase();
  const onlyErrors = el.onlyErrors.checked;
  const idx = [];
  for (let i = 0; i < state.records.length; i += 1) {
    const r = state.records[i];
    const cod = String(r.codRetorno || "").trim().toUpperCase();
    const isSuccess = cod === "00" || cod === "0" || cod === "ZA";
    if (onlyErrors && isSuccess) continue;
    if (!q || String(r[field] ?? "").toLowerCase().includes(q)) idx.push(i);
  }
  state.filteredIndexes = idx;
  sortData();
  state.page = 1;
}

function sortData() {
  if (!state.sortField) return;
  const field = state.sortField;
  const order = state.sortOrder === "asc" ? 1 : -1;

  state.filteredIndexes.sort((a, b) => {
    const valA = state.records[a][field];
    const valB = state.records[b][field];

    if (typeof valA === "number" && typeof valB === "number") {
      return (valA - valB) * order;
    }
    
    // For dates and strings
    const strA = String(valA ?? "").toLowerCase();
    const strB = String(valB ?? "").toLowerCase();
    
    if (strA < strB) return -1 * order;
    if (strA > strB) return 1 * order;
    return 0;
  });
}

function renderTable() {
  const total = state.filteredIndexes.length;
  const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  state.page = Math.min(state.page, totalPages);
  const start = (state.page - 1) * state.pageSize;
  const end = start + state.pageSize;
  const rows = state.filteredIndexes.slice(start, end).map((i) => {
    const r = state.records[i];
    const tooltipText = `<b>Tipo de Servico</b>${r.tipoServico}\n<b>Forma de Lancamento</b>${r.formaLancamento}${r.inscricao ? `\n<b>Inscricao</b>${r.inscricao}` : ""}`;
    return `<tr data-index="${i}" data-tooltip="${text(tooltipText)}"><td>${text(r.lineNo)}</td><td>${text(r.lote)}</td><td>${text(r.registro)}</td><td>${text(r.cpf)}</td><td>${text(r.nome)}</td>
      <td class="text-right">${text(currencyBRL(r.valor))}</td><td class="text-right">${text(r.banco)}</td><td class="text-right">${text(r.agencia)}</td><td>${text(r.conta)}</td><td>${text(r.dtPagamento)}</td>
      <td>${text(r.codRetorno)}</td><td>${text(r.descRetorno)}</td></tr>`;
  });
  el.resultsBody.innerHTML = rows.join("");
  el.resultInfo.textContent = `${total.toLocaleString("pt-BR")} resultados`;
  el.pageInfo.textContent = `Pagina ${state.page} de ${totalPages}`;
  el.prevPageBtn.disabled = state.page <= 1;
  el.nextPageBtn.disabled = state.page >= totalPages;

  el.tableHeaders.forEach((th) => {
    th.classList.remove("sort-asc", "sort-desc");
    if (th.dataset.sort === state.sortField) {
      th.classList.add(state.sortOrder === "asc" ? "sort-asc" : "sort-desc");
    }
  });
}

function applyFiltersAndRender() {
  computeFilteredIndexes();
  renderTable();
}

function resetState() {
  state.records = [];
  state.filteredIndexes = [];
  state.summary = null;
  state.page = 1;
  renderSummary();
  renderTable();
  setStatus("Selecione um arquivo CNAB240 para iniciar.");
  el.exportCsvBtn.disabled = true;
}

function exportFilteredCsv() {
  if (!state.filteredIndexes.length) return;
  const headers = ["linha", "lote", "registro", "cpf", "nome", "valor", "banco", "agencia", "conta", "dtPagamento", "codRetorno", "descRetorno", "inscricaoSegB", "autenticacao"];
  const lines = [headers.join(";")];
  for (const i of state.filteredIndexes) {
    const r = state.records[i];
    lines.push([r.lineNo, r.lote, r.registro, r.cpf, r.nome, Number(r.valor || 0).toFixed(2), r.banco, r.agencia, r.conta, r.dtPagamento, r.codRetorno, r.descRetorno, r.inscricaoSegB, r.autenticacao].map((v) => `"${String(v ?? "").replaceAll('"', '""')}"`).join(";"));
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `retorno-cnab240-${new Date().toISOString().replaceAll(":", "-")}.csv`;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function parseOnMainThread(file) {
  const content = await file.text();
  const lines = content.split(/\r?\n/);
  const summary = { empresa: "", convenio: "", nsa: "", totalPagamentos: 0, valorTotal: 0, tipoArquivo: "" };
  const records = [];
  let tipoServico = "";
  let formaLancamento = "";
  let lastRecord = null;
  const batchSize = 3000;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) continue;
    const lineNo = i + 1;
    const tipo = fw(line, 8, 1);
    const seg = fw(line, 14, 1);
    const lote = fw(line, 4, 4);

    if (tipo === "0" && lote === "0000") {
      summary.empresa = fw(line, 73, 30).trim();
      summary.convenio = fw(line, 33, 20).trim();
      summary.nsa = fw(line, 158, 6).trim();
      summary.tipoArquivo = fw(line, 143, 1);
    }
    if (tipo === "1") {
      const codSrv = fw(line, 10, 2);
      const codLnc = fw(line, 12, 2);
      tipoServico = `${codSrv} - ${tipoServicoDescricao[codSrv] || "Servico"}`;
      formaLancamento = `${codLnc} - ${formaLancamentoDescricao[codLnc] || "Lancamento"}`;
    }
    if (tipo === "3" && seg === "A") {
      const bancoFav = fw(line, 21, 3).trim();
      const agenciaFav = `${fw(line, 24, 5).trim()}-${fw(line, 29, 1).trim()}`;
      const contaFav = `${fw(line, 30, 12).trim()}-${fw(line, 42, 1).trim()}`;
      const valor = numberFromCents(fw(line, 105, 28) + fw(line, 133, 2));
      const valorReal = numberFromCents(fw(line, 163, 15));
      const codRetorno = fw(line, 231, 2).trim();
      const record = {
        id: records.length + 1,
        lineNo,
        lote: lote.trim(),
        registro: fw(line, 9, 5).trim(),
        cpf: fw(line, 74, 11).trim(),
        nome: fw(line, 44, 30).trim(),
        valor,
        valorReal,
        banco: bancoFav,
        agencia: agenciaFav,
        conta: contaFav,
        dtPagamento: formatDate8(fw(line, 94, 8).trim()),
        dtReal: formatDate8(fw(line, 155, 8).trim()),
        nossoNumero: fw(line, 135, 20).trim(),
        seuNumero: fw(line, 74, 20).trim(),
        tipoServico,
        formaLancamento,
        codRetorno,
        descRetorno: codRetorno === "00"
          ? (summary.tipoArquivo === "1" ? "Remessa Enviada" : "Pagamento Efetuado")
          : (retornoDescricao[codRetorno] || `Codigo ${codRetorno || "-"}`),
        inscricao: "",
        endereco: "",
        vencimento: "",
        valorNominal: 0,
        abatimento: 0,
        desconto: 0,
        mora: 0,
        multa: 0,
        favorecidoDoc: "",
        autenticacao: "",
      };
      records.push(record);
      lastRecord = record;
      summary.totalPagamentos += 1;
      summary.valorTotal += valor;
    }
    if (tipo === "3" && seg === "B" && lastRecord) {
      const tipoInsc = fw(line, 18, 1);
      const numInsc = fw(line, 19, 14).trim();
      lastRecord.inscricao = `${tipoInsc === "1" ? "CPF" : "CNPJ"}: ${numInsc}`;
      const logradouro = fw(line, 33, 30).trim();
      const numero = fw(line, 63, 5).trim();
      const bairro = fw(line, 83, 15).trim();
      const cidade = fw(line, 98, 20).trim();
      const uf = fw(line, 126, 2).trim();
      lastRecord.endereco = `${logradouro}, ${numero} - ${bairro}, ${cidade}/${uf}`;
      lastRecord.vencimento = formatDate8(fw(line, 128, 8).trim());
      lastRecord.valorNominal = numberFromCents(fw(line, 136, 15));
      lastRecord.abatimento = numberFromCents(fw(line, 151, 15));
      lastRecord.desconto = numberFromCents(fw(line, 166, 15));
      lastRecord.mora = numberFromCents(fw(line, 181, 15));
      lastRecord.multa = numberFromCents(fw(line, 196, 15));
      lastRecord.favorecidoDoc = fw(line, 211, 15).trim();
    }
    if (tipo === "3" && seg === "Z" && lastRecord) lastRecord.autenticacao = fw(line, 79, 25).trim();

    if (i % batchSize === 0) {
      el.progressBar.value = Math.round(((i + 1) / Math.max(lines.length, 1)) * 100);
      setStatus(`Processando arquivo... ${el.progressBar.value}% (${records.length.toLocaleString("pt-BR")} pagamentos)`);
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  state.summary = summary;
  state.records = records;
  renderSummary();
  applyFiltersAndRender();
  el.exportCsvBtn.disabled = state.records.length === 0;
  el.progressBar.hidden = true;
  const displayedPath = getDisplayedFilePath(file);
  setStatus(`Concluido. ${state.records.length.toLocaleString("pt-BR")} pagamentos carregados. Arquivo: ${displayedPath}`);
}

function startWorker(file) {
  if (state.worker) state.worker.terminate();
  state.worker = new Worker("./parser.worker.js");
  el.progressBar.hidden = false;
  el.progressBar.value = 0;
  setStatus("Processando arquivo...");

  state.worker.onmessage = (event) => {
    const { type, percent, processed, summary, records, message } = event.data || {};
    if (type === "progress") {
      el.progressBar.value = percent || 0;
      setStatus(`Processando arquivo... ${percent || 0}% (${(processed || 0).toLocaleString("pt-BR")} pagamentos)`);
      return;
    }
    if (type === "done") {
      state.summary = summary;
      state.records = records || [];
      renderSummary();
      applyFiltersAndRender();
      el.exportCsvBtn.disabled = state.records.length === 0;
      el.progressBar.hidden = true;
      const displayedPath = getDisplayedFilePath(file);
      setStatus(`Concluido. ${state.records.length.toLocaleString("pt-BR")} pagamentos carregados. Arquivo: ${displayedPath}`);
      return;
    }
    if (type === "error") {
      el.progressBar.hidden = true;
      setStatus(`Erro: ${message || "Falha no processamento."}`);
    }
  };
  state.worker.onerror = async () => {
    state.worker?.terminate();
    state.worker = null;
    setStatus("Worker bloqueado no navegador. Tentando modo compatibilidade...");
    await parseOnMainThread(file);
  };
  state.worker.postMessage({ file });
}

let debounce = null;
el.filterValue.addEventListener("input", () => {
  clearTimeout(debounce);
  debounce = setTimeout(applyFiltersAndRender, 120);
});
el.filterField.addEventListener("change", applyFiltersAndRender);
el.onlyErrors.addEventListener("change", applyFiltersAndRender);
el.themeSelect.addEventListener("change", () => applyTheme(el.themeSelect.value));
el.toggleImportPanelBtn.addEventListener("click", () => {
  setImportPanelCollapsed(!el.importPanelContent.hidden);
});
el.toggleSummaryPanelBtn.addEventListener("click", () => {
  setSummaryPanelCollapsed(!el.summaryPanelContent.hidden);
});
el.prevPageBtn.addEventListener("click", () => ((state.page -= 1), renderTable()));
el.nextPageBtn.addEventListener("click", () => ((state.page += 1), renderTable()));
el.pageSize.addEventListener("change", () => ((state.pageSize = Number(el.pageSize.value || 100)), (state.page = 1), renderTable()));
el.tableHeaders.forEach((th) => {
  th.addEventListener("click", () => {
    const field = th.dataset.sort;
    if (state.sortField === field) {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    } else {
      state.sortField = field;
      state.sortOrder = "asc";
    }
    sortData();
    renderTable();
  });
});
el.clearBtn.addEventListener("click", () => ((el.fileInput.value = ""), resetState()));
el.exportCsvBtn.addEventListener("click", exportFilteredCsv);
el.fileInput.addEventListener("change", () => {
  const file = el.fileInput.files?.[0];
  if (!file) return;
  resetState();
  el.progressBar.hidden = false;
  el.progressBar.value = 0;
  if (isFileProtocol) {
    setStatus("Modo compatibilidade ativo (sem worker no file://).");
    parseOnMainThread(file).catch((err) => {
      el.progressBar.hidden = true;
      setStatus(`Erro: ${err?.message || "Falha no processamento."}`);
    });
    return;
  }
  startWorker(file);
});

el.resultsBody.addEventListener("click", (e) => {
  const tr = e.target.closest("tr");
  if (!tr) return;
  const index = tr.dataset.index;
  if (index !== undefined) {
    showDetailsModal(state.records[index]);
  }
});

function showDetailsModal(r) {
  const isErr = !(r.codRetorno === "00" || r.codRetorno === "ZA");
  el.modalContent.innerHTML = `
    <div class="detail-section">
      <h4>Identificacao e Status</h4>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Linha</div><div class="detail-value">${r.lineNo}</div></div>
        <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value ${isErr ? "error" : "success"}">${r.descRetorno} (${r.codRetorno})</div></div>
        <div class="detail-item"><div class="detail-label">Lote / Registro</div><div class="detail-value">${r.lote} / ${r.registro}</div></div>
        <div class="detail-item"><div class="detail-label">Nosso Numero (BB)</div><div class="detail-value">${r.nossoNumero || "-"}</div></div>
        <div class="detail-item"><div class="detail-label">Seu Numero (Ref)</div><div class="detail-value">${r.seuNumero || "-"}</div></div>
      </div>
    </div>
    
    <div class="detail-section">
      <h4>Dados do Favorecido</h4>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Nome</div><div class="detail-value">${r.nome}</div></div>
        <div class="detail-item"><div class="detail-label">Inscricao</div><div class="detail-value">${r.inscricao || "-"}</div></div>
        <div class="detail-item"><div class="detail-label">Banco / Agencia / Conta</div><div class="detail-value">${r.banco} / ${r.agencia} / ${r.conta}</div></div>
        <div class="detail-item"><div class="detail-label">Endereco</div><div class="detail-value">${r.endereco || "-"}</div></div>
      </div>
    </div>

    <div class="detail-section">
      <h4>Valores e Datas</h4>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Valor do Pagamento</div><div class="detail-value">${currencyBRL(r.valor)}</div></div>
        <div class="detail-item"><div class="detail-label">Valor Real Efetivado</div><div class="detail-value">${currencyBRL(r.valorReal)}</div></div>
        <div class="detail-item"><div class="detail-label">Data de Pagamento</div><div class="detail-value">${r.dtPagamento}</div></div>
        <div class="detail-item"><div class="detail-label">Data Efetivacao</div><div class="detail-value">${r.dtReal || "-"}</div></div>
        <div class="detail-item"><div class="detail-label">Vencimento</div><div class="detail-value">${r.vencimento || "-"}</div></div>
      </div>
    </div>

    <div class="detail-section">
      <h4>Detalhamento Financeiro (Segmento B)</h4>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Valor Nominal</div><div class="detail-value">${currencyBRL(r.valorNominal)}</div></div>
        <div class="detail-item"><div class="detail-label">Abatimento / Desconto</div><div class="detail-value">${currencyBRL(r.abatimento)} / ${currencyBRL(r.desconto)}</div></div>
        <div class="detail-item"><div class="detail-label">Mora / Multa</div><div class="detail-value">${currencyBRL(r.mora)} / ${currencyBRL(r.multa)}</div></div>
      </div>
    </div>

    <div class="detail-section">
      <h4>Servico e Autenticacao</h4>
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-label">Tipo de Servico</div><div class="detail-value">${r.tipoServico}</div></div>
        <div class="detail-item"><div class="detail-label">Forma de Lancamento</div><div class="detail-value">${r.formaLancamento}</div></div>
        <div class="detail-item"><div class="detail-label">Autenticacao Bancaria</div><div class="detail-value">${r.autenticacao || "-"}</div></div>
      </div>
    </div>
  `;
  el.modalOverlay.hidden = false;
}

el.closeModalBtn.addEventListener("click", () => (el.modalOverlay.hidden = true));
el.modalOverlay.addEventListener("click", (e) => {
  if (e.target === el.modalOverlay) el.modalOverlay.hidden = true;
});

let tooltipTimeout;

el.resultsBody.addEventListener("mouseover", (e) => {
  const tr = e.target.closest("tr");
  const content = tr?.dataset.tooltip;
  clearTimeout(tooltipTimeout);
  if (content) {
    tooltipTimeout = setTimeout(() => {
      el.tooltip.innerHTML = content;
      el.tooltip.hidden = false;
    }, 500);
  }
});

el.resultsBody.addEventListener("mousemove", (e) => {
  const x = e.clientX + 15;
  const y = e.clientY + 15;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tw = el.tooltip.offsetWidth;
  const th = el.tooltip.offsetHeight;

  el.tooltip.style.left = (x + tw > vw ? e.clientX - tw - 15 : x) + "px";
  el.tooltip.style.top = (y + th > vh ? e.clientY - th - 15 : y) + "px";
});

el.resultsBody.addEventListener("mouseout", () => {
  clearTimeout(tooltipTimeout);
  el.tooltip.hidden = true;
});

resetState();
applyTheme(localStorage.getItem(themeStorageKey) || "profissional");
setImportPanelCollapsed(localStorage.getItem(importPanelStorageKey) === "1");
setSummaryPanelCollapsed(localStorage.getItem(summaryPanelStorageKey) === "1");
