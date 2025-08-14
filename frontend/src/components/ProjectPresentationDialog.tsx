import { useEffect, useMemo, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Slide,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Chip,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import myrthesLogo from '../assets/myrthes.png'

export type ProjectPresentationDialogProps = {
  open: boolean
  onClose: () => void
  onOpenGallery?: () => void
  title: string
}

type SlideDef = {
  title: string
  bullets?: string[]
  sections?: { title: string; bullets: string[] }[]
  chips?: string[]
}

export default function ProjectPresentationDialog({ open, onClose, onOpenGallery, title }: ProjectPresentationDialogProps) {
  const isMyrthes = title.toLowerCase().includes('myrthes')

  const slides: SlideDef[] = useMemo(() => {
    if (!isMyrthes) return [{ title: title || 'Projeto', bullets: ['Sem conteúdo de apresentação disponível.'] }]
    return [
      {
        title: 'Visão Geral',
        bullets: [
          'App desktop (PyQt6) para oficinas de costura',
          'Controle de pedidos, prazos, clientes e fluxo de trabalho',
          'Operação 100% offline com SQLite',
        ],
        chips: ['Offline-first', 'Recibos', 'Dashboard']
      },
      {
        title: 'Problema e Oportunidade',
        bullets: [
          'Falta de controle integrado de pedidos/prazos',
          'Dificuldade de enxergar rentabilidade e gargalos',
          'Processos manuais e retrabalho',
        ],
      },
      {
        title: 'Solução e Diferenciais',
        bullets: [
          'Pedidos, clientes, serviços, estoque e recibos',
          'Dashboard com gráficos e exportação CSV',
          'Fila local de sincronização para envio posterior',
          'Interface simples, tema escuro e atalhos',
        ],
      },
      {
        title: 'Fluxos Principais (1)',
        sections: [
          { title: 'Dashboard', bullets: ['Serviços +/– rentáveis', 'Receita por dia', 'Exportação CSV'] },
          { title: 'Pedidos', bullets: ['Criar/editar', 'Busca por status/cliente/código', 'Entregue e remoção em lote'] },
        ],
      },
      {
        title: 'Fluxos Principais (2)',
        sections: [
          { title: 'Clientes', bullets: ['Cadastro', 'Listagem e busca rápida'] },
          { title: 'Serviços', bullets: ['Ativar/desativar', 'Preço e filtros'] },
          { title: 'Estoque', bullets: ['Ajuste de quantidades'] },
        ],
      },
      {
        title: 'Sincronização e Impressão',
        bullets: [
          'Fila local (SQLite) e envio manual com credenciais',
          'Impressão de recibos: térmica/arquivo (USB/Serial/IP)',
        ],
        chips: ['USB', 'Serial', 'IP']
      },
      {
        title: 'Arquitetura / Stack',
        sections: [
          { title: 'Stack', bullets: ['Python 3.10+', 'PyQt6 (MVC)', 'SQLite (offline-first)', 'settings.json'] },
          { title: 'Benefícios', bullets: ['Robusto e simples', 'Baixa manutenção', 'Evolução segura'] },
        ],
        chips: ['Python', 'PyQt6', 'SQLite']
      },
      {
        title: 'Resultados e Roadmap',
        sections: [
          { title: 'Resultados Esperados', bullets: ['Menos retrabalho', 'Prazos cumpridos', 'Visão de receita/margem'] },
          { title: 'Roadmap (3–6 meses)', bullets: ['Integração cloud (opcional)', 'Relatórios gerenciais (PDF)', 'Perfil multiusuário'] },
        ],
      },
      {
        title: 'Atalhos e Próximos Passos',
        sections: [
          { title: 'Atalhos', bullets: ['Ctrl+N (novo pedido)', 'Ctrl+D (dashboard)', 'Ctrl+T (tema)', 'Ctrl+Shift+R (sincronizar)'] },
          { title: 'CTA', bullets: ['Agendar walkthrough de 30 minutos', 'Implantação e suporte'] },
        ],
      },
    ]
  }, [isMyrthes, title])

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState<'left' | 'right'>('left')
  const maxSteps = slides.length

  const next = () => { setDir('left'); setStep(s => Math.min(s + 1, maxSteps - 1)) }
  const prev = () => { setDir('right'); setStep(s => Math.max(s - 1, 0)) }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step])

  const current = slides[step]

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { backgroundColor: '#04070c' } }}
      slotProps={{ backdrop: { sx: { backgroundColor: 'rgba(0,0,0,0.82)' } } } as any}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, backgroundColor: '#04070c' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {isMyrthes && <Avatar src={myrthesLogo} alt="Myrthes" variant="rounded" sx={{ width: 28, height: 28 }} />}
          <Typography variant="h6">{isMyrthes ? 'Apresentação — Myrthes Costuras' : title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">{step + 1} / {maxSteps}</Typography>
          <IconButton onClick={onClose} size="small" aria-label="Fechar"><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#05080f' }}>
        <Stepper activeStep={step} alternativeLabel sx={{ mb: 2, '.MuiStepIcon-root': { color: 'rgba(255,255,255,0.25)' }, '.Mui-active': { color: '#e6edf3 !important' }, '.Mui-completed': { color: '#e6edf3 !important' } }}>
          {slides.map((s, i) => (
            <Step key={i}><StepLabel /></Step>
          ))}
        </Stepper>

        <Box sx={{ position: 'relative', minHeight: 300 }}>
          <Slide in={true} direction={dir} appear mountOnEnter unmountOnExit>
            <Box key={step} sx={{ position: 'absolute', inset: 0, display: 'grid', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 1.5 }}>{current.title}</Typography>

              {current.chips && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  {current.chips.map((c, i) => (
                    <Chip key={i} label={c} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#e6edf3' }} />
                  ))}
                </Box>
              )}

              {current.bullets && (
                <List dense sx={{ pl: 1 }}>
                  {current.bullets.map((b, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText primary={b} primaryTypographyProps={{ variant: 'body1', color: 'text.secondary' }} />
                    </ListItem>
                  ))}
                </List>
              )}

              {current.sections && (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { md: '1fr 1fr' } }}>
                  {current.sections.map((sec, i) => (
                    <Box key={i} className="card-glass" sx={{ p: 2, borderLeft: '3px solid rgba(255,255,255,0.12)' }}>
                      <Typography variant="body1" sx={{ mb: 0.5 }}>{sec.title}</Typography>
                      <List dense>
                        {sec.bullets.map((b, bi) => (
                          <ListItem key={bi} sx={{ py: 0.4 }}>
                            <ListItemText primary={b} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Slide>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between', backgroundColor: '#04070c' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={prev} disabled={step === 0} className="btn-aurora">Anterior</Button>
          <Button onClick={next} disabled={step === maxSteps - 1} className="btn-aurora">Próximo</Button>
        </Box>
        {onOpenGallery && isMyrthes && (
          <Button onClick={onOpenGallery} className="btn-aurora">Ver Galeria</Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
