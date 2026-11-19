// The legacy public mail sender is retired. The contact page uses the consultation flow;
// the consultation has its own validated, durable and explicitly gated intake.
export async function POST(){return Response.json({code:'endpoint_retired',message:'Usa la pagina contatti.'},{status:410,headers:{'Cache-Control':'no-store'}});}
