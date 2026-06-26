import style from "./_.module.css"
import React from "react" 

interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  mode?: "detail" | "default"
  icon: React.ElementType 
}

export default function Card({ 
  children,
  onClick,
  className,
  mode = "default",
  icon: Icon 
}: CardProps) {
  return (
    <div className={`${style.card} ${className}`} onClick={onClick}>
      <figure className={style.avatarFigure}>
        <div className={style.avatarWrapper}>
          <Icon className={style.avatarIcon} /> 
        </div>
        {mode === "default" && (
          <div className={style.overlay}>
            <span className={style.overlayText}>see details</span>
          </div>
        )}
      </figure>
      {children}
    </div>
  )
}