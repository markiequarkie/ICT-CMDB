import React, { useMemo, useState } from 'react'
import { Bell, ChevronRight, Laptop, Monitor, Phone, Printer, Search, Server, Users } from 'lucide-react'

const employees = [
  { id: 1, name: 'Nina de Vries', role: 'UX Designer', department: 'Design', initials: 'ND', color: '#7c5cff', status: 'Aanwezig' },
  { id: 2, name: 'Daan Bakker', role: 'Backend Developer', department: 'Engineering', initials: 'DB', color: '#00b894', status: 'Aanwezig' },
  { id: 3, name: 'Sophie Jansen', role: 'Product Manager', department: 'Product', initials: 'SJ', color: '#ff7a59', status: 'Thuiswerken' },
  { id: 4, name: 'Lucas de Groot', role: 'IT Support', department: 'IT', initials: 'LG', color: '#4299e1', status: 'Aanwezig' }
]

const hardware = {
  1: [
    { type: 'Laptop', name: 'MacBook Pro 14"', tag: 'LAP-1042', status: 'Actief', icon: Laptop },
    { type: 'Monitor', name: 'Dell UltraSharp 27"', tag: 'MON-2081', status: 'Actief', icon: Monitor },
    { type: 'Telefoon', name: 'iPhone 15', tag: 'TEL-3024', status: 'Actief', icon: Phone }
  ],
  2: [
    { type: 'Laptop', name: 'Dell Latitude 5540', tag: 'LAP-1028', status: 'Actief', icon: Laptop },
    { type: 'Monitor', name: 'LG UltraFine 27"', tag: 'MON-2094', status: 'Actief', icon: Monitor }
  ],
  3: [
    { type: 'Laptop', name: 'MacBook Air M2', tag: 'LAP-1066', status: 'Actief', icon: Laptop },
    { type: 'Telefoon', name: 'Samsung Galaxy S24', tag: 'TEL-3041', status: 'Actief', icon: Phone },
    { type: 'Printer', name: 'HP LaserJet', tag: 'PRI-4012', status: 'Gedeeld', icon: Printer }
  ],
  4: [
    { type: 'Laptop', name: 'Lenovo ThinkPad T14', tag: 'LAP-1088', status: 'Actief', icon: Laptop },
    { type: 'Telefoon', name: 'iPhone 14', tag: 'TEL-3019', status: 'Actief', icon: Phone }
  ]
}

export default function App() {
  const [selectedId, setSelectedId] = useState(1)
  const [query, setQuery] = useState('')
  const selected = employees.find((employee) => employee.id === selectedId)
  const filteredEmployees = useMemo(() => employees.filter((employee) =>
    `${employee.name} ${employee.department}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">C</div><span>CMDB</span></div>
        <nav>
          <a className="nav-item active"><span className="nav-icon"><Users size={18} /></span>Medewerkers</a>
          <a className="nav-item"><span className="nav-icon"><Laptop size={18} /></span>Hardware</a>
          <a className="nav-item"><span className="nav-icon"><Server size={18} /></span>Applicaties</a>
        </nav>
        <div className="sidebar-footer"><div className="avatar small">ME</div><div><b>Mark van Rossum</b><span>Beheerder</span></div></div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div><p className="eyebrow">IT OVERZICHT</p><h1>Dashboard</h1></div>
          <div className="header-actions"><button className="icon-button" aria-label="Notificaties"><Bell size={20} /></button><button className="primary-button">+ Nieuw item</button></div>
        </header>

        <section className="stats-grid">
          <article className="stat-card purple"><div className="stat-icon"><Users size={22} /></div><div><span>Medewerkers</span><strong>248</strong><small>+12 deze maand</small></div></article>
          <article className="stat-card green"><div className="stat-icon"><Laptop size={22} /></div><div><span>Hardware</span><strong>316</strong><small>94% toegewezen</small></div></article>
          <article className="stat-card orange"><div className="stat-icon"><Server size={22} /></div><div><span>Applicaties</span><strong>42</strong><small>3 vernieuwen</small></div></article>
          <article className="stat-card blue"><div className="stat-icon"><Monitor size={22} /></div><div><span>Actieve tickets</span><strong>18</strong><small>5 hoge prioriteit</small></div></article>
        </section>

        <section className="workspace">
          <div className="employees-panel">
            <div className="panel-heading"><div><p>ORGANISATIE</p><h2>Medewerkers</h2></div><span className="count">248</span></div>
            <label className="search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zoek medewerker..." /></label>
            <div className="employee-list">
              {filteredEmployees.map((employee) => (
                <button key={employee.id} className={`employee-row ${selectedId === employee.id ? 'selected' : ''}`} onClick={() => setSelectedId(employee.id)}>
                  <div className="avatar" style={{ background: employee.color }}>{employee.initials}</div>
                  <div className="employee-info"><b>{employee.name}</b><span>{employee.role}</span></div>
                  <div className="employee-status"><i></i>{employee.status}</div>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>

          <aside className="detail-panel">
            <div className="detail-profile">
              <div className="avatar large" style={{ background: selected.color }}>{selected.initials}</div>
              <div><p>MEDEWERKER</p><h2>{selected.name}</h2><span>{selected.role} · {selected.department}</span></div>
            </div>
            <div className="detail-heading"><div><p>Gekoppelde apparatuur</p><span>{hardware[selectedId].length} items</span></div><button>Beheren</button></div>
            <div className="hardware-list">
              {hardware[selectedId].map((item) => {
                const Icon = item.icon
                return <article className="hardware-card" key={item.tag}><div className="hardware-icon"><Icon size={20} /></div><div className="hardware-info"><span>{item.type}</span><b>{item.name}</b><small>{item.tag}</small></div><span className="active-status">{item.status}</span></article>
              })}
            </div>
          </aside>
        </section>
      </section>
    </main>
  )
}
