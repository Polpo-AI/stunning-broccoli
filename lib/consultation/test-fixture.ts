export const testName='POLPO TEST';
export const testBusiness='TEST TECNICO POLPO';
export const testDetails='POLPO_SYNTHETIC_PRODUCTION_TEST';
export const testManagement='GESTIONALE DI PROVA';
export function testContact(id:string){return {name:testName,businessName:testBusiness,email:`info+polpo-test-${id}@polpo-ai.com`,phone:'',preference:'email' as const};}
