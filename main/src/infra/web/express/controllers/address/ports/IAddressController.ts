interface IAddressController<TRequest, TResponse, TNext> {
  registerAddress(req: TRequest, res: TResponse, next?: TNext): Promise<void | TResponse>;
}

export default IAddressController;