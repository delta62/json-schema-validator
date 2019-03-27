/**
 * Top level program arguments
 */
export default interface Args {
  /** Input schema file. If omitted, stdin is used. */
  file?: string

  /** Name of the joi object to call in the code */
  name: string
}
