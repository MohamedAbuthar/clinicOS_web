"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

interface RadioGroupItemElement extends React.ReactElement {
  props: {
    value?: string
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}

export function RadioGroup({ className, value, onValueChange, children, ...props }: RadioGroupProps) {
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        const childElement = child as RadioGroupItemElement
        return React.cloneElement(childElement, {
          checked: value !== undefined ? (childElement.props.value === value) : undefined,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            childElement.props.onChange?.(e)
            onValueChange?.(e.target.value)
          },
        })
      })}
    </div>
  )
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <label className="inline-flex items-center gap-2">
      <input type="radio" className={cn("h-4 w-4", className)} {...props} />
      <span className="text-sm">{props.children}</span>
    </label>
  )
}