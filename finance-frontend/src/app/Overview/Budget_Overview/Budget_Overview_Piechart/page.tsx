'use client'

import {Public_Sans} from 'next/font/google';
import { Pie, Cell } from "recharts";
import dynamic from "next/dynamic";

const public_sans = Public_Sans({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
  
})

interface BudgetOverview {
    budget_id: number,
    category_name: string,
    max_amount: number,
    spent: number,
    remaining: number,
    color: string,
}

interface BudgetOverviewPiechartProps {
    budgetOverview: BudgetOverview[];
}

//This removes the SSR error
const PieChart = dynamic(
    () => (
        import("recharts").then(recharts => recharts.PieChart)
    ),
    {
        ssr: false
    }
);



export default function Budget_Overview_Piechart({ budgetOverview }: BudgetOverviewPiechartProps) {

    const COLORS: string[] = []
    const data: { name: string, value: number }[] = [];
    
    budgetOverview.map((budget) => {
        COLORS.push(budget.color)
        data.push({name: budget.category_name, value: budget.max_amount})
    })
 
    return(
        <>
            <PieChart style={{marginTop: '20px'}} width={250} height={200}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx="48%"
                    cy="60%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </>
    )
}