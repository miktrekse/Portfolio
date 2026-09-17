// Simple modal and smooth scroll interactions
document.addEventListener('DOMContentLoaded', ()=>{
  const hero = document.querySelector('.hero')
  const heroToggle = document.getElementById('hero-toggle')
  let heroHidden = false
  let heroHeight = 0

  function hideHero(done){
    if(!hero || heroHidden){ done(); return }
    heroHidden = true
    heroHeight = hero.getBoundingClientRect().height
    hero.style.maxHeight = heroHeight + 'px'
    hero.offsetHeight // force reflow so the transition picks up the starting height
    hero.classList.add('hero-hidden')
    requestAnimationFrame(()=>{ hero.style.maxHeight = '0px' })
    if(heroToggle) heroToggle.hidden = false
    hero.addEventListener('transitionend', function onEnd(ev){
      if(ev.propertyName !== 'max-height') return
      hero.removeEventListener('transitionend', onEnd)
      done()
    })
  }

  function showHero(){
    if(!hero || !heroHidden) return
    heroHidden = false
    hero.style.maxHeight = heroHeight + 'px'
    hero.classList.remove('hero-hidden')
    if(heroToggle) heroToggle.hidden = true
    hero.addEventListener('transitionend', function onEnd(ev){
      if(ev.propertyName !== 'max-height') return
      hero.removeEventListener('transitionend', onEnd)
      hero.style.maxHeight = 'none'
    })
    window.scrollTo({top:0, behavior:'smooth'})
  }

  if(heroToggle) heroToggle.addEventListener('click', showHero)

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href')
      if(href.startsWith('#') && href.length>1){
        e.preventDefault()
        const scrollToTarget = ()=>{
          const el = document.querySelector(href)
          if(el) el.scrollIntoView({behavior:'smooth', block:'start'})
        }
        hideHero(scrollToTarget)
      }
    })
  })

  const modal = document.getElementById('project-modal')
  const modalTitle = document.getElementById('modal-title')
  const modalImage = document.getElementById('modal-image')
  const modalDesc = document.getElementById('modal-desc')
  const modalDemo = document.getElementById('modal-demo')
  const modalGalleryCount = document.getElementById('modal-gallery-count')
  const modalCode = document.getElementById('modal-code')

  const projects = {
    '1': {
      title: 'DiscTats',
      desc: 'Web platforma disku golfa spēlētājiem: administrēšanas panelis, treniņu vingrinājumu izveide, sacensību reģistrācija un disku golfa laukumu karte.',
      code: 'https://github.com/miktrekse/Problema.git',
      images: [
        'disc golf logo.png',
        '22E9A7A3-A86B-449B-B7B6-3A75F85D1200.png',
        '6C992139-B1DD-47E2-893E-A3E66F53C960.png',
        'B073B11B-D099-474A-ACF6-CD873F709D47.png',
        'F8135967-1FC1-498F-B637-D0EE96F660C0.png'
      ]
    },
    '2': {
      title: 'Weather App',
      desc: 'Laikapstākļu lietotne "VTDT Sky", kas rāda aktuālos apstākļus, stundas prognozi, gaisa kvalitāti, vēju, mitrumu un saules/mēness laikus izvēlētajai vietai.',
      code: 'https://github.com/miktrekse/Weather-APP-VTDT.git',
      images: [
        'weather logo.png',
        'weather app main page.png'
      ]
    }
  }

  let currentProject = null
  let galleryIndex = 0

  function updateGalleryImage(){
    const project = projects[currentProject]
    modalImage.src = project.images[galleryIndex]
    modalGalleryCount.textContent = project.images.length > 1 ? `(${galleryIndex+1}/${project.images.length})` : ''
  }

  function openProject(id){
    const project = projects[id]
    currentProject = id
    galleryIndex = 0
    modalTitle.textContent = project.title
    modalDesc.textContent = project.desc
    modalCode.href = project.code
    updateGalleryImage()
    modal.setAttribute('aria-hidden','false')
  }

  modalDemo.addEventListener('click', ()=>{
    if(!currentProject) return
    const project = projects[currentProject]
    galleryIndex = (galleryIndex + 1) % project.images.length
    updateGalleryImage()
  })

  document.querySelectorAll('[data-open]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      e.preventDefault()
      openProject(btn.getAttribute('data-open'))
    })
  })

  document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click', ()=>{
    modal.setAttribute('aria-hidden','true')
  }))

  modal.addEventListener('click', e=>{
    if(e.target===modal) modal.setAttribute('aria-hidden','true')
  })
})
