import {NextResponse,type NextRequest} from 'next/server';
import {productionTestConfig,productionTestAuthenticated,productionTestDenied,productionTestHeaders} from '@/lib/consultation/production-test';
export function middleware(request:NextRequest){
 const config=productionTestConfig();
 if(!productionTestAuthenticated(request.headers.get('authorization'),config))return productionTestDenied(config);
 const response=NextResponse.next();for(const [key,value]of Object.entries(productionTestHeaders))response.headers.set(key,value);
 response.headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'");
 return response;
}
export const config={matcher:['/contatti/prova/:path*'],runtime:'nodejs'};
