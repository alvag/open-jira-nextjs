import {NextFetchEvent, NextRequest, NextResponse} from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {

    const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$');

    const id = req.page.params?.id || '';

    if (!checkMongoIDRegExp.test(id as string)) {
        return new Response(JSON.stringify({message: 'El id no es válido'}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return NextResponse.next();
}
