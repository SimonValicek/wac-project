import { Component, State, Prop, h } from '@stencil/core';


interface Reservation {
  id: string;
  licensePlate: string;
  category: 'employee' | 'visitor' | 'ambulance';
  datetime: string;
  spotNumber: number;
}

@Component({
  tag: 'reservation-manager',
  styleUrl: 'reservation-manager.css',
  shadow: true,
})
export class ReservationManager {
  @Prop() apiBase: string;
  @State() list: Reservation[] = [];
  @State() form: Omit<Reservation, 'id'> = {
    licensePlate: '',
    category: 'employee',
    datetime: '',
    spotNumber: null,
  };
  @State() editingId: string = null;

  componentWillLoad() {
    this.load();
  }

  async load() {
    try {
      const res = await fetch(`${this.apiBase}/reservations`); // use apiBase here
      this.list = await res.json();
    } catch {
      this.list = [];
    }
  }

async save() {
  const url = this.editingId
    ? `${this.apiBase}/reservations/${this.editingId}`
    : `${this.apiBase}/reservations`;
  const method = this.editingId ? 'PUT' : 'POST';

  // Fix datetime format: convert local datetime string to ISO string
  const payload = {
    ...this.form,
    datetime: new Date(this.form.datetime).toISOString(),
  };

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('Failed to save reservation:', await res.text());
  }

  this.resetForm();
  this.load();
}
  async remove(id: string) {
    await fetch(`${this.apiBase}/reservations/${id}`, { method: 'DELETE' }); // use apiBase here
    this.load();
  }

  edit(resv: Reservation) {
    const { id, ...data } = resv;
    this.form = { ...data };
    this.editingId = id;
  }

  cancel() {
    this.resetForm();
  }

  resetForm() {
    this.form = { licensePlate: '', category: 'employee', datetime: '', spotNumber: null };
    this.editingId = null;
  }

  render() {
    return (
      <div class="reservation-manager">
        <h2>Správa rezervácií</h2>
        <form onSubmit={e => { e.preventDefault(); this.save(); }}>
          <input
            type="text"
            placeholder="ŠPZ"
            value={this.form.licensePlate}
            onInput={e => this.form.licensePlate = (e.target as HTMLInputElement).value}
            required />

          <select
  onInput={e => {
    const v = (e.currentTarget as HTMLSelectElement).value;
    if (v === 'employee' || v === 'visitor' || v === 'ambulance') {
      this.form.category = v;
    }
  }}
>
  <option
    value="employee"
    selected={this.form.category === 'employee'}
  >
    Employee
  </option>
  <option
    value="visitor"
    selected={this.form.category === 'visitor'}
  >
    Visitor
  </option>
  <option
    value="ambulance"
    selected={this.form.category === 'ambulance'}
  >
    Ambulance
  </option>
</select>


          <input
            type="datetime-local"
            value={this.form.datetime}
            onInput={e => this.form.datetime = (e.target as HTMLInputElement).value}
            required />

          <input
            type="number"
            placeholder="Číslo miesta"
            value={this.form.spotNumber ?? ''}
            onInput={e => this.form.spotNumber = parseInt((e.target as HTMLInputElement).value, 10)}
            required />

          <button type="submit">
            { this.editingId ? 'Upraviť rezerváciu' : 'Vytvoriť rezerváciu' }
          </button>
          { this.editingId && (
            <button type="button" onClick={() => this.cancel()}>
              Zrušiť úpravu
            </button>
          ) }
        </form>

        <ul>
          { this.list.map(item => (
            <li key={item.id}>
              <strong>{item.licensePlate}</strong> ({item.category}) – {new Date(item.datetime).toLocaleString()}, miesto {item.spotNumber}
              <button onClick={() => this.edit(item)}>✎</button>
              <button onClick={() => this.remove(item.id)}>🗑</button>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}
