export default class Helpers {
  static arraysEqual(a: unknown[], b: unknown[]): boolean {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i += 1) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  static formatDate(date: Date): string {
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  }

  static formatValue(value: number): string {
    return `R$${value.toFixed(2)}`;
  }
}
