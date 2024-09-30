import { useState } from "react"

interface CardProps {
    id: string
}

export function Card({ id }: CardProps) {
    const [r] = useState(Math.random())
    return (
        <div className="shadow rounded w-36 h-36 text-center">
            Id: {id} R: {r}
        </div>
    )
}
