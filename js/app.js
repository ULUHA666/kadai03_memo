document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("expense-form");
    const expensesList = document.getElementById("expenses-list");
    let counter = 0; // データ登録回数をカウントする変数を追加

    // ページが読み込まれたときに家計簿のデータを表示する
    displayExpenses();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const date = form.elements["date"].value;
        const item = form.elements["item"].value;
        const amount = form.elements["amount"].value;

        // 新しい家計簿データを追加する
        expensesData.push({ date: date, item: item, amount: amount });

        // ローカルストレージにデータを保存する
        localStorage.setItem('expensesData', JSON.stringify(expensesData));

        // ローカルストレージに保存されたデータをコンソールログに出力する
        console.log('保存された家計簿データ:', JSON.parse(localStorage.getItem('expensesData')));

        // 家計簿データを表示する
        displayExpenses();

        // フォームの内容をリセット
        form.reset();

        // カウンターをインクリメントして3回目のデータ登録時にアラートを表示
        counter++;
        if (counter === 3) {
            alert("お金使いすぎ注意！");
        }
    });
});

// 家計簿のデータを表示する関数
function displayExpenses() {
    const expensesList = document.getElementById('expenses-list');

    // データをクリアする
    expensesList.innerHTML = '';

    // データを表示する
    expensesData.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.textContent = `${expense.date}: ${expense.item} - ${expense.amount}円`;
        expensesList.appendChild(expenseItem);
    });
}

// 初期の家計簿データをローカルストレージから取得する
let expensesData = JSON.parse(localStorage.getItem('expensesData')) || [];

// 家計簿のデータを表示する関数
function displayExpenses() {
    const expensesList = document.getElementById('expenses-list');

    // データをクリアする
    expensesList.innerHTML = '';

    // ページが読み込まれたときのみデータを表示する
    if (document.readyState === "complete") {
        // データを表示する
        expensesData.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.textContent = `${expense.date}: ${expense.item} - ${expense.amount}円`;
            expensesList.appendChild(expenseItem);
        });
    }
}
