import { GetServerSideProps, GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next';
import Head from 'next/head';
import { ShowcaseEntry } from '../Componet/ShowcaseEntry/ShowcaseEntry';
import { getShowcaseEntryId } from '../libs/getAll';



export const getServerSideProps: GetServerSideProps = async (context) => {


    const id = context.params?.id as string
    try {
        if (id && context.req.method === "GET") {
            const data = await getShowcaseEntryId(id as string)

            return {
                props: {
                    data

                }
            }

        } else {
            return {
                props: {
                    data: [],
                }
            }
        }
    } catch (e) {
        throw new Error("there  some  error")
    }
}




export interface ItemPage {
    id: string,
    description: string,
    image: {
        url: string,
        width: number,
        height: number,
        title: string
    },
    title: string,
    url: {
        [key: string]: string

    }
}
const ItemPage: NextPage<{ data: ItemPage }> = ({ data }) => {
    return (
        <>
            <Head>
                <title>Showcase {data.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ShowcaseEntry {...data} />
        </>
    )
}
export default ItemPage
