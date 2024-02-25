import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Index = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/todos')
    }, [])

    return null
}
export default Index