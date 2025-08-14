import { useEffect, useState } from 'react'
import axios from 'axios'
import TourDialog from '../components/TourDialog'
import GalleryDialog from '../components/GalleryDialog'
import ProjectPresentationDialog from '../components/ProjectPresentationDialog'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Box, Button, Tab, Tabs, TextField, MenuItem, Snackbar, Alert } from '@mui/material'
import myrthesLogo from '../assets/myrthes.png'
import ctLogo from '../assets/ct.png'
import logo from '../assets/logo.png'

const API = 'http://127.0.0.1:8000/api'

interface Profile {
  id?: number
  name: string
  title?: string
  bio?: string
  phone?: string
  email?: string
  github?: string
  linkedin?: string
}

interface Project {
  id?: number
  title: string
  description?: string
  url?: string
  tags?: string
}

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [openTour, setOpenTour] = useState(false)
  const [openGallery, setOpenGallery] = useState<{ open: boolean; title: string }>({ open: false, title: '' })
  const [openPresentation, setOpenPresentation] = useState<{ open: boolean; title: string }>({ open: false, title: '' })
  const [tab, setTab] = useState(0)
  const [toast, setToast] = useState<{open: boolean; msg: string; sev: 'success'|'error'}>({open:false,msg:'',sev:'success'})

  // Form Orçamento
  const [budget, setBudget] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    project_name: '',
    project_summary: '',
    scope_features: '',
    target_platforms: 'web',
    deadline_weeks: 6,
    budget_range: 'a definir',
  })

  useEffect(() => {
    async function load() {
      try {
        const [p, pr] = await Promise.all([
          axios.get(`${API}/profile`).then(r => r.data),
          axios.get(`${API}/projects`).then(r => r.data),
        ])
        setProfile(p)
        setProjects(pr)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const downloadPdf = async () => {
    const res = await axios.get(`${API}/pdf`, { responseType: 'blob' })
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio.pdf'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const submitBudget = async () => {
    try {
      await axios.post(`${API}/budget`, budget)
      setToast({open:true, msg:'Briefing enviado com sucesso! Retornarei com o orçamento em breve.', sev:'success'})
      setBudget({ company_name:'', contact_name:'', email:'', phone:'', project_name:'', project_summary:'', scope_features:'', target_platforms:'web', deadline_weeks:6, budget_range:'a definir' })
    } catch (e) {
      setToast({open:true, msg:'Falha ao enviar briefing. Tente novamente.', sev:'error'})
    }
  }

  if (loading) {
    return (
      <div className="h-full grid place-items-center p-10">
        <div className="animate-pulse text-zinc-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-full px-6 py-10 md:px-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-16 w-16 object-contain antialiased" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{profile?.name ?? 'Seu Nome'}</h1>
              <p className="text-zinc-400 mt-1">{profile?.title}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setOpenTour(true)} className="btn-aurora text-sm px-5">Tour</button>
            <button onClick={downloadPdf} className="btn-aurora text-sm px-5">Baixar PDF</button>
          </div>
        </header>

        <Box className="tabs-surface" sx={{ overflowX: 'auto', display: 'flex', alignItems: 'center', px: 1.5, py: 0.5 }}>
          <Tabs value={tab} onChange={(_,v)=>setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ minHeight: 0 }}>
            <Tab label="Projetos" />
            <Tab label="Orçamento" />
          </Tabs>
        </Box>

        {tab === 0 && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold">Projetos em produção</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p, idx) => (
                <motion.button
                  key={p.id}
                  onClick={() => {
                    const isMyrthes = (p.title || '').toLowerCase().includes('myrthes')
                    if (isMyrthes) {
                      setOpenPresentation({ open: true, title: p.title })
                    } else {
                      setOpenGallery({ open: true, title: p.title })
                    }
                  }}
                  className="text-left card-glass p-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={(p.title || '').toLowerCase().includes('myrthes') ? myrthesLogo : ctLogo}
                        alt={(p.title || '').toLowerCase().includes('myrthes') ? 'Myrthes Costuras' : 'C-Treina'}
                        className="h-24 w-24 object-contain rounded"
                      />
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                    </div>
                  </div>
                  {p.description && (
                    <p className="mt-3 text-zinc-300 text-sm leading-relaxed">{p.description}</p>
                  )}
                  {p.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.split(',').map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {tab === 1 && (
          <section className="card-glass p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-semibold">Briefing para Orçamento</h2>
            <Box sx={{ display: 'grid', gap: 2.5 }}>
              <TextField label="Empresa" value={budget.company_name} onChange={e=>setBudget({...budget, company_name:e.target.value})} size="small" />
              <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { sm: '1fr 1fr' } }}>
                <TextField label="Contato" value={budget.contact_name} onChange={e=>setBudget({...budget, contact_name:e.target.value})} size="small" />
                <TextField label="Telefone" value={budget.phone} onChange={e=>setBudget({...budget, phone:e.target.value})} size="small" />
              </Box>
              <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { sm: '1fr 1fr' } }}>
                <TextField label="Email" type="email" value={budget.email} onChange={e=>setBudget({...budget, email:e.target.value})} size="small" />
                <TextField label="Nome do Projeto" value={budget.project_name} onChange={e=>setBudget({...budget, project_name:e.target.value})} size="small" />
              </Box>
              <TextField label="Resumo do Projeto" value={budget.project_summary} onChange={e=>setBudget({...budget, project_summary:e.target.value})} multiline minRows={3} />
              <TextField label="Principais Funcionalidades (escopo)" value={budget.scope_features} onChange={e=>setBudget({...budget, scope_features:e.target.value})} multiline minRows={3} />
              <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { sm: '1fr 1fr 1fr' } }}>
                <TextField select label="Plataformas" value={budget.target_platforms} onChange={e=>setBudget({...budget, target_platforms:e.target.value})} size="small">
                  <MenuItem value="web">Web</MenuItem>
                  <MenuItem value="mobile">Mobile</MenuItem>
                  <MenuItem value="desktop">Desktop</MenuItem>
                  <MenuItem value="web+mobile">Web + Mobile</MenuItem>
                </TextField>
                <TextField label="Prazo (semanas)" type="number" value={budget.deadline_weeks} onChange={e=>setBudget({...budget, deadline_weeks: Number(e.target.value)})} size="small" />
                <TextField select label="Faixa de orçamento" value={budget.budget_range} onChange={e=>setBudget({...budget, budget_range:e.target.value})} size="small">
                  <MenuItem value="a definir">A definir</MenuItem>
                  <MenuItem value="5-10k">5-10k</MenuItem>
                  <MenuItem value="10-20k">10-20k</MenuItem>
                  <MenuItem value="20k+">20k+</MenuItem>
                </TextField>
              </Box>
              <div className="pt-2 flex justify-end">
                <Button onClick={submitBudget} className="btn-aurora">Enviar Briefing</Button>
              </div>
            </Box>
          </section>
        )}

        <Footer name={profile?.name || undefined} title={profile?.title || undefined} email={profile?.email || undefined} phone={profile?.phone || undefined} github={profile?.github || undefined} linkedin={profile?.linkedin || undefined} />
      </div>

      <TourDialog open={openTour} onClose={() => setOpenTour(false)} />
      <GalleryDialog open={openGallery.open} onClose={() => setOpenGallery({ open: false, title: '' })} title={openGallery.title} />
      <ProjectPresentationDialog
        open={openPresentation.open}
        onClose={() => setOpenPresentation({ open: false, title: '' })}
        onOpenGallery={() => {
          const t = openPresentation.title
          setOpenPresentation({ open: false, title: '' })
          // evita sobreposição de backdrops entre diálogos
          setTimeout(() => setOpenGallery({ open: true, title: t }), 150)
        }}
        title={openPresentation.title}
      />

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={()=>setToast({...toast, open:false})}>
        <Alert severity={toast.sev} sx={{ width: '100%' }}>{toast.msg}</Alert>
      </Snackbar>
    </div>
  )
}
