async function getPosts(){
    try {
        const response = await fetch('https://blog-api-t6u0.onrender.com/posts', {
            method: 'GET',
            headers:{
                'Content-Type': "application/json",
            }
        })
        const data = await response.json()
        console.log(data);
        return data;
    } catch (err) {
        console.log('err',err);
    }
}

// getPosts()

// async function createPost(){
//     let form = {
//         title: 'anonim',
//         body: 'from input value'
//         commentID: 
//     }
//     try {
//         const response = await fetch(`https://blog-api-t6u0.onrender.com/posts`, {
//             method: 'POST',
//             headers:{
//                 'Content-Type': "application/json",
//             },
//             body: JSON.stringify(form)
//         })
//         const data = await response.json();
//         return data;
//     } catch (err) {
//         console.log('err',err);
//     }
// }

// createPost()