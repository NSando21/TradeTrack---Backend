import { MercadoPagoConfig } from 'mercadopago';

export function configureMercadoPago() {
  return new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  });
}
