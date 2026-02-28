import React from 'react'

export default function StatCard({title, value, color}) {
  return (
    <div className={`card ${color} shadow-lg hover:shadow-xl transition-all duration-300`}>
        <div className="card-body items-center text-center">
            
            <p className="text-md uppercase tracking-wide opacity-70">
                {title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
                {value}
            </h2>

        </div>
    </div>
  )
}
