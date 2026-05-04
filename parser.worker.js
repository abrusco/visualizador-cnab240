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
  "CC": "Codigo de Nosso Número Invalido",
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

function fw(line, start, length) {
  return line.slice(start - 1, start - 1 + length);
}

function numberFromCents(raw) {
  const digits = (raw || "").replace(/\D/g, "");
  if (!digits) return 0;
  return Number(digits) / 100;
}

function formatDate8(raw) {
  if (!/^\d{8}$/.test(raw)) return "";
  return `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4, 8)}`;
}

async function parseFile(file) {
  const summary = { empresa: "", convenio: "", nsa: "", totalPagamentos: 0, valorTotal: 0 };
  const records = [];
  let tipoServico = "";
  let formaLancamento = "";
  let lineNo = 0;
  let lastRecord = null;
  let processedBytes = 0;
  const reader = file.stream().pipeThrough(new TextDecoderStream()).getReader();
  let carry = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    processedBytes += value.length;
    const chunk = carry + value;
    const lines = chunk.split(/\r?\n/);
    carry = lines.pop() || "";

    for (const line of lines) {
      lineNo += 1;
      if (!line) continue;
      const tipo = fw(line, 8, 1);
      const seg = fw(line, 14, 1);
      const lote = fw(line, 4, 4);

      if (tipo === "0" && lote === "0000") {
        summary.empresa = fw(line, 73, 30).trim();
        summary.convenio = fw(line, 33, 20).trim();
        summary.nsa = fw(line, 158, 6).trim();
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
          cpf: fw(line, 74, 11).trim(), // Placeholder, Segmento B has the real one
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
          descRetorno: retornoDescricao[codRetorno] || `Codigo ${codRetorno || "-"}`,
          // Segmento B data placeholders
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
    }

    self.postMessage({ type: "progress", percent: Math.round((processedBytes / file.size) * 100), processed: records.length });
  }

  self.postMessage({ type: "done", summary, records });
}

self.onmessage = async (event) => {
  const { file } = event.data || {};
  if (!file) {
    self.postMessage({ type: "error", message: "Arquivo invalido." });
    return;
  }
  try {
    await parseFile(file);
  } catch (error) {
    self.postMessage({ type: "error", message: error?.message || "Falha ao processar arquivo." });
  }
};
