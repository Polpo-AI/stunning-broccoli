// Portal values verified from hs_legal_basis. No consent or GDPR-exemption default.
export const supportedContactLegalBases = ['Legitimate interest – prospect/lead','Performance of a contract'] as const;
export function supportedContactLegalBasis(value:string){return supportedContactLegalBases.some(option=>option===value);}
