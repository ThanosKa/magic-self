import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statusVariants = cva(
    "inline-flex items-center gap-2 rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                online: "border-transparent bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:text-green-400",
                offline: "border-transparent bg-slate-500/15 text-slate-700 hover:bg-slate-500/25 dark:text-slate-400",
                draft: "border-transparent bg-orange-500/15 text-orange-700 hover:bg-orange-500/25 dark:text-orange-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface StatusProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> { }

function Status({ className, variant, ...props }: StatusProps) {
    return (
        <div className={cn(statusVariants({ variant }), className)} {...props} />
    )
}

const statusIndicatorVariants = cva(
    "h-2 w-2 rounded-full relative",
    {
        variants: {
            variant: {
                default: "bg-primary",
                secondary: "bg-secondary-foreground",
                destructive: "bg-destructive",
                outline: "bg-foreground",
                online: "bg-green-500 animate-pulse before:absolute before:inset-0 before:rounded-full before:bg-green-500 before:animate-ping before:opacity-75",
                offline: "bg-slate-500",
                draft: "bg-orange-500 animate-pulse",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface StatusIndicatorProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> { }

function StatusIndicator({ className, variant, ...props }: StatusIndicatorProps) {
    return (
        <div
            className={cn(statusIndicatorVariants({ variant }), className)}
            {...props}
        />
    )
}

function StatusLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
    return <span className={cn("font-medium", className)} {...props} />
}

export { Status, StatusIndicator, StatusLabel, statusVariants }
