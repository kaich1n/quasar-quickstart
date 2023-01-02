import { api } from 'src/boot/axios';

export function getAction(url: string, params: any) {
  return api({
    url: url,
    method: 'get',
    params: params,
  });
}
