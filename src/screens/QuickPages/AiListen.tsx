import React from 'react'

export const AiListen = () => {
    return (
        <div style={{
            width: "100%",
            height: "100vh",
            /* 100% of the viewport height */
            border: "none"
            /* Remove iframe border */
        }}

        >


            <iframe
                style={{
                    width: "100%",
                    height: "100vh",
                    /* 100% of the viewport height */
                    border: "none"
                    /* Remove iframe border */
                }}
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSGSK9HyW0MS6uzVwy0Zl5x5KKQK4Ms2rmQpDXrBaNnZb9clUTB3h-Wxsd-yMuM5QyOZvZB-I-dxSWq/pubhtml?gid=370908080&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
        </div>
    )
}

export default AiListen