export interface IService<TInput = undefined, TOutput = void> {
  execute(data?: TInput): Promise<TOutput>
}