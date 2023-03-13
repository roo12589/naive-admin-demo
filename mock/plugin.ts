import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild) {
  return viteMockServe({
    mockPath: './src/mock/modules',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    supportTs: true,
    logger:true,
    injectCode: `
      import { setupProdMockServer } from '../mock';
      setupProdMockServer();
    `,
  })
}