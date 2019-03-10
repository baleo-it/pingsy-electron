import React from 'react'
import Styled from 'styled-components'

const Navbar = Styled.header`
    height: 30px;
    background-color: #3498db;
    -webkit-app-region: drag;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;

    & h1 {
        font-size: 14px;
        color: white;
        margin: 0;
        line-height: 1;
        font-weight: 300;
        letter-spacing: 0.15px;
    }
`

const Header = () => (
    <Navbar>
        <h1>Pingsy Electron</h1>
    </Navbar>
)

export { Header }
