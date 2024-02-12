export const isValidCNPJ = (document: string): boolean => {
  const cleanedCNPJ = document.replace(/\D/g, '')

  // Verifica se tem 14 dígitos
  if (cleanedCNPJ.length !== 14) {
    return false
  }

  // Calcula os dígitos verificadores
  let sum = 0
  let multiplier = 2
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanedCNPJ[i]) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
  }
  const remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder

  sum = 0
  multiplier = 2
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanedCNPJ[i]) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
  }
  const remainder2 = sum % 11
  const digit2 = remainder2 < 2 ? 0 : 11 - remainder2

  // Verifica se os dígitos verificadores estão corretos
  if (
    digit1 !== parseInt(cleanedCNPJ[12]) ||
    digit2 !== parseInt(cleanedCNPJ[13])
  ) {
    return false
  }

  return true
}
