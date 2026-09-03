// Simple modal and smooth scroll interactions
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href')
      if(href.startsWith('#') && href.length>1){
        e.preventDefault()
        const el = document.querySelector(href)
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'})
      }
    })
  })

  const modal = document.getElementById('project-modal')
  const modalTitle = document.getElementById('modal-title')
  const modalImage = document.getElementById('modal-image')
  const modalDesc = document.getElementById('modal-desc')
  const modalDemo = document.getElementById('modal-demo')
  const modalCode = document.getElementById('modal-code')

  function openProject(id){
    // placeholder content; replace when user provides real data
    if(id==='1'){
      modalTitle.textContent = 'DiscTats'
      modalImage.src = 'disc golf logo.png'
      modalDesc.textContent = 'Šeit būs izvērsts pirmā projekta apraksts: tehnoloģiju steks, mana loma, galvenie izaicinājumi un rezultāts.'
      modalDemo.href = '#'
      modalCode.href = 'https://github.com/miktrekse/Problema.git'
    } else {
      modalTitle.textContent = 'Flight Radar'
      modalImage.src = 'flight radar logo.png'
      modalDesc.textContent = 'Šeit būs izvērsts otrā projekta apraksts: tehnoloģiju steks, mana loma, galvenie izaicinājumi un rezultāts.'
      modalDemo.href = '#'
      modalCode.href = 'https://github.com/miktrekse/flightradar.git'
    }
    modal.setAttribute('aria-hidden','false')
  }

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
