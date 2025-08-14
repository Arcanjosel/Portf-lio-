import { useMemo, useState } from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Step,
	StepLabel,
	Stepper,
	Tab,
	Tabs,
	Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export type TourDialogProps = {
	open: boolean
	onClose: () => void
}

type TourStep = { label: string; description: string; imageFile: string }

type AppKey = 'nr13' | 'myrthes'

const stepsByApp: Record<AppKey, TourStep[]> = {
	nr13: [
		{ label: 'Janela Principal', description: 'Visão geral e navegação entre módulos.', imageFile: 'main_window.png' },
		{ label: 'Login', description: 'Autenticação inicial do usuário.', imageFile: 'login.png' },
		{ label: 'Clientes', description: 'Cadastro e busca, validação de CNPJ/CPF.', imageFile: 'clientes.png' },
		{ label: 'Equipamentos', description: 'Vasos/Caldeiras com especificações técnicas.', imageFile: 'equipamentos.png' },
		{ label: 'Válvulas', description: 'Dispositivos de segurança: Válvulas.', imageFile: 'valvulas.png' },
		{ label: 'Manômetros', description: 'Dispositivos de segurança: Manômetros.', imageFile: 'manometros.png' },
		{ label: 'Inspeções', description: 'Programação, resultados e próximos eventos.', imageFile: 'inspecoes.png' },
		{ label: 'Manutenções', description: 'Preventivas/corretivas, peças e custos.', imageFile: 'manutencoes.png' },
		{ label: 'Calibrações', description: 'Ensaios, certificados e upload.', imageFile: 'calibracoes.png' },
		{ label: 'Relatórios', description: 'Filtros, períodos e exportações.', imageFile: 'relatorios.png' },
		{ label: 'Configurações', description: 'Banco, Cloud, logging e cache.', imageFile: 'configuracoes.png' },
	],
	myrthes: [
		{ label: 'Janela Principal', description: 'Cabeçalho, navegação e tema.', imageFile: 'main_window.png' },
		{ label: 'Dashboard', description: 'Gráficos, receita por dia e exportação CSV.', imageFile: 'dashboard.png' },
		{ label: 'Pedidos', description: 'Criação, filtros, entregue, lote e recibo.', imageFile: 'pedidos.png' },
		{ label: 'Clientes', description: 'Cadastro e listagem.', imageFile: 'clientes.png' },
		{ label: 'Serviços', description: 'Ativação/desativação, preços e filtros.', imageFile: 'servicos.png' },
		{ label: 'Estoque', description: 'Itens e ajustes de quantidades.', imageFile: 'estoque.png' },
		{ label: 'Sincronização', description: 'Fila local (SQLite) e envio manual.', imageFile: 'sincronizacao.png' },
		{ label: 'Configurações', description: 'Tema, fonte, caminhos e ajustes.', imageFile: 'configuracoes.png' },
		{ label: 'Impressora', description: 'USB/Serial/IP, parâmetros e teste.', imageFile: 'impressora.png' },
	],
}

function ImageOrPlaceholder({ src, alt }: { src: string; alt: string }) {
	const [error, setError] = useState(false)
	if (error) {
		return (
			<Box
				sx={{
					border: '1px dashed rgba(255,255,255,0.2)',
					borderRadius: 2,
					p: 3,
					textAlign: 'center',
					color: 'rgba(255,255,255,0.7)'
				}}
			>
				<Typography variant="body2">
					Imagem não encontrada.
				</Typography>
				<Typography variant="body2">
					Coloque o arquivo em: <code>frontend/public{src}</code>
				</Typography>
			</Box>
		)
	}
	return (
		<img
			src={src}
			alt={alt}
			onError={() => setError(true)}
			style={{ width: '100%', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)' }}
		/>
	)
}

export default function TourDialog({ open, onClose }: TourDialogProps) {
	const [tab, setTab] = useState<AppKey>('nr13')
	const [step, setStep] = useState(0)

	const steps = useMemo(() => stepsByApp[tab], [tab])
	const maxSteps = steps.length

	const handleChangeTab = (_: unknown, value: AppKey) => {
		setTab(value)
		setStep(0)
	}

	const next = () => setStep((s) => Math.min(s + 1, maxSteps - 1))
	const prev = () => setStep((s) => Math.max(s - 1, 0))

	const current = steps[step]
	const imageSrc = `/tour/${tab}/${current.imageFile}`

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Typography variant="h6">Tour dos Sistemas</Typography>
				<Button size="small" onClick={onClose} startIcon={<CloseIcon />}>Fechar</Button>
			</DialogTitle>
			<DialogContent dividers>
				<Tabs
					value={tab}
					onChange={(_, v) => handleChangeTab(_, v)}
					variant="scrollable"
					scrollButtons="auto"
				>
					<Tab value="nr13" label="NR-13" />
					<Tab value="myrthes" label="Myrthes Costuras" />
				</Tabs>

				<Box sx={{ mt: 3 }}>
					<Stepper activeStep={step} alternativeLabel>
						{steps.map((s) => (
							<Step key={s.label}>
								<StepLabel>{s.label}</StepLabel>
							</Step>
						))}
					</Stepper>
				</Box>

				<Box sx={{ mt: 3, display: 'grid', gap: 2 }}>
					<Typography variant="subtitle1">{current.label}</Typography>
					<Typography variant="body2" color="text.secondary">{current.description}</Typography>
					<ImageOrPlaceholder src={imageSrc} alt={`${tab} - ${current.label}`} />
				</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-between' }}>
				<Box>
					<Typography variant="caption" color="text.secondary">
						Coloque as imagens em: <code>frontend/public/tour/{tab}/{current.imageFile}</code>
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button disabled={step === 0} onClick={prev} variant="outlined">Anterior</Button>
					<Button disabled={step === maxSteps - 1} onClick={next} variant="contained">Próximo</Button>
				</Box>
			</DialogActions>
		</Dialog>
	)
}
