const memoList = document.getElementById('memo-list');
const categorySelect = document.getElementById('category');
const titleInput = document.getElementById('title');
const contentTextarea = document.getElementById('content');
const saveButton = document.getElementById('save-button');

// メモの保存
function saveMemo(category, title, content) {
  const memos = getMemos();
  const memo = {
    id: memos.length + 1,
    category,
    title,
    content,
  };
  memos.push(memo);
  localStorage.setItem('memos', JSON.stringify(memos));
  return memo;
}

// メモの削除
function deleteMemo(id) {
  const memos = getMemos();
  const newMemos = memos.filter((memo) => memo.id !== id);
  localStorage.setItem('memos', JSON.stringify(newMemos));
}

// メモ一覧の表示
function renderMemoList(memos) {
  memoList.innerHTML = '';
  memos.forEach((memo) => {
    const li = document.createElement('li');
    li.textContent = `[${memo.category}] ${memo.title}`;
    li.addEventListener('click', () => {
      renderMemoDetail(memo);
    });
    memoList.appendChild(li);
  });
}

// メモの詳細表示
function renderMemoDetail(memo) {
  const detailDiv = document.createElement('div');
  detailDiv.innerHTML = `<h2>${memo.title}</h2> <p>カテゴリー: ${memo.category}</p> <p>${memo.content}</p> <button type="button" id="delete-button">削除</button>` ;
  const deleteButton = detailDiv.querySelector('#delete-button');
  deleteButton.addEventListener('click', () => {
  deleteMemo(memo.id);
  renderMemoList(getMemos());
  detailDiv.remove();
  });
  memoList.after(detailDiv);
  }
  
  // メモ一覧を取得
  function getMemos() {
  const memos = localStorage.getItem('memos');
  if (memos === null) {
  return [];
  }
  return JSON.parse(memos);
  }
  
  // メモの保存ボタンが押された時の処理
  saveButton.addEventListener('click', () => {
  const category = categorySelect.value;
  const title = titleInput.value;
  const content = contentTextarea.value;
  saveMemo(category, title, content);
  categorySelect.selectedIndex = 0;
  titleInput.value = '';
  contentTextarea.value = '';
  renderMemoList(getMemos());
  });
  
  // 初期表示時にメモ一覧を表示
  renderMemoList(getMemos());
 
