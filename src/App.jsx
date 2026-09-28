import { useEffect, useRef, useState } from 'react'
import { profile, projects } from './data/portfolio'

function Arrow({ down = false, className = '' }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={down ? { transform: 'rotate(135deg)' } : undefined}>
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalLink({ href, children, className = '' }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<span className="sr-only"> (abre em nova aba)</span></a>
}

function SectionLabel({ number, children }) {
  return <p className="section-label"><span>{number}</span>{children}</p>
}

function Project({ project, index }) {
  const imagePath = project.image ? `${import.meta.env.BASE_URL}${project.image.replace(/^\/+/, '')}` : ''
  return (
    <article className="project">
      <div className="project-art">
        {imagePath ? (
          <img src={imagePath} alt={project.imageAlt} width="1200" height="900" loading="lazy" />
        ) : (
          <div className="project-type" aria-hidden="true">
            <div className="project-art-top"><span>KRG / DIGITAL</span><Arrow /></div>
            <div className="project-art-title">{project.id === 'portfolio' ? <>PORT<br />FÓLIO<span>.</span></> : project.name}</div>
            <div className="project-art-bottom"><span>{project.id === 'portfolio' ? 'KAIKY RODRIGUES GERALDO' : project.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
          </div>
        )}
      </div>

      <div className="project-info">
        <span className="eyebrow">{project.category || 'Desenvolvimento web'}</span>
        <h3>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        {project.contribution && <p className="contribution"><span>Minha participação</span>{project.contribution}</p>}
        <ul className="flex flex-wrap gap-2" aria-label={`${project.features ? 'Destaques' : 'Tecnologias'} de ${project.name}`}>
          {(project.features || project.technologies).map((item) => <li key={item} className="tag">{item}</li>)}
        </ul>
        <div className="project-links">
          {project.sourceUrl && <ExternalLink href={project.sourceUrl} className="inline-link">Explorar o código <Arrow /></ExternalLink>}
          {project.liveUrl && <ExternalLink href={project.liveUrl} className="inline-link">Abrir projeto <Arrow /></ExternalLink>}
        </div>
        {project.details?.length > 0 && (
          <details className="project-details">
            <summary>Decisões do projeto <span aria-hidden="true" className="disclosure-symbol">+</span></summary>
            <dl>
              {project.details.map((detail) => <div key={detail.title}><dt>{detail.title}</dt><dd>{detail.text}</dd></div>)}
            </dl>
          </details>
        )}
      </div>
    </article>
  )
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState('')
  const resetTimer = useRef(null)
  const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent('Olá, Kaiky! Vi seu portfólio e gostaria de conversar sobre um projeto.')}`

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  async function copyEmail() {
    window.clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus('E-mail copiado.')
    } catch {
      setCopyStatus('Selecione o endereço abaixo para copiar.')
    }
    resetTimer.current = window.setTimeout(() => setCopyStatus(''), 4500)
  }

  return (
    <section id="contato" className="contact-section section-space">
      <div className="page-shell">
        <SectionLabel number="03">Contato</SectionLabel>
        <div className="contact-heading">
          <h2>Seu próximo<br /><span>projeto.</span></h2>
          <p>Me conte o que precisa ser desenvolvido.<br />Vamos conversar sobre escopo e próximos passos.</p>
        </div>
        <div className="contact-actions">
          <ExternalLink className="button button-accent" href={whatsappUrl}>Conversar pelo WhatsApp <Arrow /></ExternalLink>
          <a className="button button-outline" href={`mailto:${profile.email}`}>Enviar e-mail <Arrow /></a>
        </div>
        <div className="contact-bottom">
          <div className="email-block">
            <a className="email-address" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button onClick={copyEmail} className="copy-button" type="button" aria-label="Copiar endereço de e-mail">Copiar e-mail</button>
            <span className="copy-status" role="status" aria-live="polite">{copyStatus}</span>
          </div>
          <div className="social-links">
            <ExternalLink href={profile.github}>GitHub <Arrow /></ExternalLink>
            {profile.linkedin && <ExternalLink href={profile.linkedin}>LinkedIn <Arrow /></ExternalLink>}
            <ExternalLink href={profile.instagram}>Instagram <Arrow /></ExternalLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const visibleProjects = projects.filter((project) => project.published)
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <div className="page-shell header-inner">
          <a href="#inicio" className="wordmark" aria-label="Kaiky Rodrigues Geraldo — início">krg<span>.</span></a>
          <nav aria-label="Navegação principal">
            <a href="#projetos">Projetos</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato" className="nav-contact">Contato <Arrow /></a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className="hero page-shell">
          <div className="hero-topline"><p className="eyebrow">{profile.role}</p><span className="edition">PORTFÓLIO / {new Date().getFullYear()}</span></div>
          <h1><span>KAIKY</span><span className="hero-surname">RODRIGUES<span className="hero-dot">.</span></span><span className="sr-only"> Geraldo</span></h1>
          <div className="hero-bottom">
            <p className="hero-description">Interfaces web.<br /><span>Desenvolvimento em React e JavaScript.</span></p>
            <a className="hero-cta" href="#projetos">Conheça meu trabalho <span className="circle-arrow"><Arrow down /></span></a>
          </div>
          <div className="hero-index"><span>DESIGN & CÓDIGO</span><span>PROJETOS, PROCESSO E CONTATO</span></div>
        </section>

        <section id="projetos" className="page-shell section-space">
          <SectionLabel number="01">Projetos selecionados</SectionLabel>
          <div className="section-heading"><h2>Do código<br />à interface.</h2><p>O que construí.<br />E as escolhas por trás de cada projeto.</p></div>
          <div className="project-list">
            {visibleProjects.map((project, index) => <Project project={project} index={index} key={project.id} />)}
            {visibleProjects.length === 0 && <p className="empty-state">Novos projetos serão apresentados aqui. <ExternalLink href={profile.github}>Acompanhe pelo GitHub.</ExternalLink></p>}
          </div>
        </section>

        <section id="sobre" className="about-section section-space">
          <div className="page-shell about-grid">
            <div><SectionLabel number="02">Sobre mim</SectionLabel><h2>Kaiky Rodrigues<br /><span className="muted">Geraldo.</span></h2></div>
            <div className="about-content">
              <p className="about-lead">Meu trabalho começa na interface<br className="desktop-break" /> e continua no código.</p>
              <p>Sou desenvolvedor de software, com foco em interfaces e aplicações web. Meu trabalho inclui sites para serviços de coaching, uma marca de sucos e uma dupla musical.</p>
              <p>React e JavaScript fazem parte desse trabalho. Nos projetos, documento minha participação e as decisões de implementação para que você possa avaliar além da primeira tela.</p>
              <div className="stack-block"><p className="eyebrow">Neste portfólio</p><ul className="stack-list">{['React', 'JavaScript', 'Vite', 'Tailwind CSS'].map((item) => <li key={item}>{item}</li>)}</ul></div>
              <ExternalLink href={profile.github} className="inline-link">Acompanhar no GitHub <Arrow /></ExternalLink>
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="page-shell footer"><p>© {new Date().getFullYear()} {profile.name}</p><a href="#inicio">Voltar ao topo <Arrow /></a></footer>
    </>
  )
}
