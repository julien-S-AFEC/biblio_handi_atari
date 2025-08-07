export const getDocuments = () => {
    return fetch('http://localhost:5000/api/document', {
        method: 'GET',
        headers: { "Content-type": "application/json" }
    })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(documents => {
            console.log('documents', documents)
            return documents
        })
        .catch(error => {
            console.log(error)
        })
}
