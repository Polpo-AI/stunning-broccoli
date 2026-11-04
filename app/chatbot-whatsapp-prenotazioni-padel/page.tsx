import { detailPages } from '@/components/inner/content';
import { InnerDetail, pageMetadata } from '@/components/inner/InnerPages';
const page = detailPages.padel;
export const metadata = pageMetadata(page.title, page.description, page.slug);
export default function Page(){ return <InnerDetail page={page}/>; }
