import { Helmet } from 'react-helmet';

type OpenGraphProps = {
    title: string;
    description?: string;
    image: string;
    url: string;
    type?: string;
}

const OpenGraph = ({
    title,
    description="",
    image,
    url,
    type="website"
}: OpenGraphProps) => {

    return (
        <div>
            <Helmet>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
                <meta property="og:type" content={type} />
            </Helmet>
        </div>
    )
}

export default OpenGraph