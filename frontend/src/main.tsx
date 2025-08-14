import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import App from './pages/App'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: { default: '#0b0f17', paper: '#0f1623' },
		text: { primary: '#e6edf3' },
	},
	shape: { borderRadius: 12 },
	components: {
		MuiTabs: {
			styleOverrides: {
				indicator: { display: 'none' },
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					color: 'rgba(230,237,243,0.75)',
					opacity: 1,
					textTransform: 'none',
					fontWeight: 600,
					borderRadius: 10,
					minHeight: 32,
					paddingInline: 10,
					marginRight: 6,
					'&.Mui-selected': {
						color: '#0b0f17',
						background: 'linear-gradient(120deg, #ffffff, #e5e7eb)',
						boxShadow: '0 2px 12px rgba(255,255,255,0.12)',
					},
					'&:hover': { color: '#e6edf3' },
					'&.Mui-selected:hover': { color: '#0b0f17' },
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					backgroundColor: 'rgba(255,255,255,0.04)',
					'& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.12)' },
					'&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
				},
				input: { color: '#e6edf3' },
			},
		},
		MuiInputBase: { styleOverrides: { input: { color: '#e6edf3' } } },
		MuiFormLabel: { styleOverrides: { root: { color: 'rgba(230,237,243,0.7)' } } },
	},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
