import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules:Record<string,any> = import.meta.globEager('./modules/*.js')
const mockModules: any = []
Object.keys(modules).forEach((key) => {
    mockModules.push(...modules[key].default)
})

export function setupProdMockServer() {
    createProdMockServer(mockModules)
}
