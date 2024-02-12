export const isValidCPF = (document: string): boolean => {
  const cleanedCPF = document.replace(/\D/g, '')

  // Verifica se tem 11 dígitos
  if (cleanedCPF.length !== 11) {
    return false
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanedCPF)) {
    return false
  }

  // Calcula os dígitos verificadores
  let sum = 0
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanedCPF[i - 1]) * (11 - i)
  }
  let remainder = (sum * 10) % 11
  const digit1 = remainder === 10 ? 0 : remainder

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanedCPF[i - 1]) * (12 - i)
  }
  remainder = (sum * 10) % 11
  const digit2 = remainder === 10 ? 0 : remainder

  // Verifica se os dígitos verificadores estão corretos
  if (
    digit1 !== parseInt(cleanedCPF[9]) ||
    digit2 !== parseInt(cleanedCPF[10])
  ) {
    return false
  }

  return true
}
