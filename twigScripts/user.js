document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('mysql-soutadejulien.alwaysdata.net/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Connexion réussie !');
      } else {
        alert(result.error || 'Erreur lors de la connexion');
      }
    } catch (error) {
      alert('Erreur réseau');
      console.error(error);
    }
  });
});