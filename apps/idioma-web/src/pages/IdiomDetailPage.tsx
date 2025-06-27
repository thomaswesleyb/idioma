import { useParams } from 'react-router-dom'

export default function IdiomDetailPage() {
    const { id } = useParams()

    return <h1>Idiom Detail for ID: {id}</h1>
}