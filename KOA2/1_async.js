function timeout() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(1)
            resolve()
        }, 2000)
    })
}
// async await 异步等待
async function fn() {
    await timeout();
    console.log(2)
}
fn()