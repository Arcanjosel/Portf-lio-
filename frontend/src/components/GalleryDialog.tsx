import { useEffect, useMemo, useRef, useState } from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
	Fade,
	Chip,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

export type GalleryDialogProps = {
	open: boolean
	onClose: () => void
	title: string
}

type StepInfo = { label: string; description: string }

type ProjectKey = 'nr13' | 'myrthes' | 'generic'

const stepsInfo: Record<ProjectKey, StepInfo[]> = {
	nr13: [
		{ label: 'Janela Principal', description: 'Visão geral do sistema e navegação entre módulos.' },
		{ label: 'Login', description: 'Autenticação inicial de usuários com permissões.' },
		{ label: 'Clientes', description: 'Cadastro e busca com validação de CNPJ/CPF e histórico por cliente.' },
		{ label: 'Equipamentos', description: 'Registro de vasos/caldeiras, especificações técnicas e vínculos.' },
		{ label: 'Válvulas', description: 'Dispositivos de segurança com controle de calibrações e documentos.' },
		{ label: 'Manômetros', description: 'Cadastro, características e controle de validade/calibração.' },
		{ label: 'Inspeções', description: 'Programação, resultados, laudos e próximas inspeções.' },
		{ label: 'Manutenções', description: 'Preventivas/corretivas, peças, custos e histórico completo.' },
		{ label: 'Calibrações', description: 'Geração de certificados e upload para cloud storage (NR-13).' },
		{ label: 'Relatórios', description: 'Filtros e exportação (PDF/Excel) para conformidade.' },
		{ label: 'Configurações', description: 'Banco, Google Cloud, logging e cache com TTL.' },
	],
	myrthes: [
		{ label: 'Janela Principal', description: 'Navegação, cabeçalho e alternância de tema escuro/claro.' },
		{ label: 'Dashboard', description: 'Gráficos de serviços rentáveis e receita por dia, exportação CSV.' },
		{ label: 'Pedidos', description: 'Criação, filtros, marcação de entregue, lote e impressão de recibo.' },
		{ label: 'Clientes', description: 'Cadastro e listagem com busca rápida.' },
		{ label: 'Serviços', description: 'Ativação/desativação, edição de preço e filtros.' },
		{ label: 'Estoque', description: 'Itens e ajuste de quantidades com histórico simples.' },
		{ label: 'Sincronização', description: 'Fila local (SQLite) e envio manual das operações.' },
		{ label: 'Configurações', description: 'Tema, fonte, caminhos e opções gerais.' },
		{ label: 'Impressora', description: 'USB/Serial/IP e parâmetros para impressora térmica.' },
	],
	generic: [],
}

function slugify(input: string): string {
	return input
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '')
}

function detectProjectKey(title: string): ProjectKey {
	const t = title.toLowerCase()
	if (t.includes('nr-13') || t.includes('nr13')) return 'nr13'
	if (t.includes('myrthes')) return 'myrthes'
	return 'generic'
}

async function imageExists(url: string): Promise<boolean> {
	return new Promise((resolve) => {
		const img = new Image()
		img.onload = () => resolve(true)
		img.onerror = () => resolve(false)
		img.src = url
	})
}

export default function GalleryDialog({ open, onClose, title }: GalleryDialogProps) {
	const [items, setItems] = useState<ReactImageGalleryItem[]>([])
	const [index, setIndex] = useState(0)
	const ref = useRef<ImageGallery>(null)

	const projectKey = useMemo(() => slugify(title || 'projeto'), [title])
	const keyForInfo = useMemo(() => detectProjectKey(title || ''), [title])
	const info = stepsInfo[keyForInfo]

	useEffect(() => {
		if (!open) return
		let cancelled = false
		;(async () => {
			const candidateExtensions = ['jpg', 'png', 'jpeg', 'webp']
			const found: ReactImageGalleryItem[] = []
			for (let i = 1; i <= 20; i++) {
				let hit: { orig: string; thumb: string } | null = null
				for (const ext of candidateExtensions) {
					const orig = `/gallery/${projectKey}/${i}.${ext}`
					const thumb = `/gallery/${projectKey}/thumbs/${i}.${ext}`
					if (await imageExists(orig)) { hit = { orig, thumb }; break }
				}
				if (hit) {
					const stepInfo = info[i - 1]
					found.push({
						original: hit.orig,
						thumbnail: hit.thumb,
						description: stepInfo ? `${stepInfo.label} — ${stepInfo.description}` : undefined,
					})
				}
			}
			if (!cancelled) { setItems(found); setIndex(0) }
		})()
		return () => { cancelled = true }
	}, [open, projectKey, info])

	const goPrev = () => {
		const nextIdx = Math.max(index - 1, 0)
		ref.current?.slideToIndex(nextIdx)
		setIndex(nextIdx)
	}
	const goNext = () => {
		const nextIdx = Math.min(index + 1, Math.max(items.length - 1, 0))
		ref.current?.slideToIndex(nextIdx)
		setIndex(nextIdx)
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullWidth
			maxWidth="lg"
			TransitionComponent={Fade}
			PaperProps={{ sx: { backgroundColor: '#0a0f16' } }}
			slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.72)' } } } as any}
		>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Typography variant="h6">Galeria — {title}</Typography>
				<IconButton onClick={onClose} size="small" aria-label="Fechar"><CloseIcon /></IconButton>
			</DialogTitle>
			<DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>
				{items.length > 0 ? (
					<Box sx={{ position: 'relative' }}>
						<ImageGallery
							ref={ref}
							items={items}
							showPlayButton={false}
							showFullscreenButton
							showThumbnails
							slideDuration={450}
							slideInterval={3000}
							showBullets
							onSlide={(i) => setIndex(i)}
							renderCustomControls={() => (
								<Box sx={{ position: 'absolute', top: 8, left: 8, right: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
									<Chip label={`${index + 1} / ${items.length}`} color="default" size="small" sx={{ bgcolor: 'rgba(0,0,0,0.55)', color: '#fff', pointerEvents: 'auto' }} />
									<Box sx={{ display: 'flex', gap: 1, pointerEvents: 'auto' }}>
										<Button onClick={goPrev} className="btn-aurora" size="small" disabled={index === 0}>Anterior</Button>
										<Button onClick={goNext} className="btn-aurora" size="small" disabled={index === items.length - 1}>Próximo</Button>
									</Box>
								</Box>
							)}
							renderItem={(item) => {
								const s = info[index]
								return (
									<Box>
										{/* Frame da imagem */}
										<Box sx={{
											minHeight: { xs: 320, md: 420 },
											backgroundColor: '#0b1220',
											border: '1px solid rgba(255,255,255,0.08)',
											borderRadius: 2,
											display: 'grid',
											placeItems: 'center',
											overflow: 'hidden',
										}}>
											<img src={item.original as string} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
										</Box>
										{/* Infos do dialog */}
										{(s || item.description) && (
											<Box sx={{ mt: 1.5 }}>
												<Typography variant="subtitle1">{s?.label}</Typography>
												<Typography variant="body2" color="text.secondary">{s?.description || item.description}</Typography>
											</Box>
										)}
									</Box>
								)
							}}
						/>
					</Box>
				) : (
					<Box sx={{ p: 3 }}>
						{/* Frame quando não há imagens */}
						<Box sx={{
							minHeight: { xs: 280, md: 360 },
							backgroundColor: '#0b1220',
							border: '1px solid rgba(255,255,255,0.08)',
							borderRadius: 2,
							display: 'grid',
							placeItems: 'center',
							textAlign: 'center'
						}}>
							<Box>
								<Typography variant="subtitle1">Imagem não encontrada</Typography>
								<Typography variant="body2" color="text.secondary">
									Coloque os arquivos em <code>frontend/public/gallery/{projectKey}/1.jpg</code> ... e thumbnails em <code>frontend/public/gallery/{projectKey}/thumbs/1.jpg</code>.
								</Typography>
							</Box>
						</Box>
					</Box>
				)}
			</DialogContent>
		</Dialog>
	)
}
