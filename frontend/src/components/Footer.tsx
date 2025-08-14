import { Box, Link, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

export type FooterProps = {
	name?: string
	title?: string
	email?: string
	phone?: string
	github?: string
	linkedin?: string
}

export default function Footer({ name, title, email, phone, github, linkedin }: FooterProps) {
	return (
		<Box component="footer" sx={{ mt: 8 }}>
			{/* Barra aurora superior */}
			<Box sx={{ height: 4, background: 'linear-gradient(120deg, #7c3aed, #06b6d4, #22c55e)' }} />
			<Box sx={{ py: 4, px: { xs: 3, md: 0 }, backgroundColor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
				<Box sx={{ maxWidth: 1100, mx: 'auto', display: 'grid', gap: 2, gridTemplateColumns: { md: '1fr auto' }, alignItems: 'center' }}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>{name || 'Jean Carlos Costa do Nascimento'}</Typography>
						<Typography variant="body2" color="text.secondary">{title || 'Desenvolvedor Full Stack'}</Typography>
					</Box>
					<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
						{email && (
							<Link href={`mailto:${email}`} underline="none" color="inherit" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
								<EmailIcon fontSize="small" />
								<Typography variant="body2">{email}</Typography>
							</Link>
						)}
						{phone && (
							<Link href={`tel:${phone}`} underline="none" color="inherit" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
								<PhoneIcon fontSize="small" />
								<Typography variant="body2">{phone}</Typography>
							</Link>
						)}
						{github && (
							<Link href={github} target="_blank" rel="noopener" underline="none" color="inherit" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
								<GitHubIcon fontSize="small" />
								<Typography variant="body2">GitHub</Typography>
							</Link>
						)}
						{linkedin && (
							<Link href={linkedin} target="_blank" rel="noopener" underline="none" color="inherit" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
								<LinkedInIcon fontSize="small" />
								<Typography variant="body2">LinkedIn</Typography>
							</Link>
						)}
					</Box>
				</Box>
				<Box sx={{ maxWidth: 1100, mx: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', color: 'text.secondary', fontSize: 12 }}>
					<Typography variant="caption">© {new Date().getFullYear()} {name || 'Jean Carlos Costa do Nascimento'}. Todos os direitos reservados.</Typography>
					<Typography variant="caption">Construído com FastAPI, React, Tailwind e MUI.</Typography>
				</Box>
			</Box>
		</Box>
	)
}
