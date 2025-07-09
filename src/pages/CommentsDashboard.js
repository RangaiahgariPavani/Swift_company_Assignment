import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE_OPTIONS = [10, 50, 100];

function CommentsDashboard() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem('search') || '');
  const [sortConfig, setSortConfig] = useState(JSON.parse(localStorage.getItem('sort')) || { key: '', direction: '' });
  const [page, setPage] = useState(Number(localStorage.getItem('page')) || 1);
  const [pageSize, setPageSize] = useState(Number(localStorage.getItem('pageSize')) || 10);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('search', search);
    localStorage.setItem('sort', JSON.stringify(sortConfig));
    localStorage.setItem('page', page);
    localStorage.setItem('pageSize', pageSize);
  }, [search, sortConfig, page, pageSize]);

  const filteredComments = useMemo(() => {
    const lower = search.toLowerCase();
    return comments.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.email.toLowerCase().includes(lower) ||
      c.body.toLowerCase().includes(lower)
    );
  }, [comments, search]);

  const sortedComments = useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === '') return filteredComments;

    const sorted = [...filteredComments].sort((a, b) => {
      const valA = a[sortConfig.key].toString().toLowerCase();
      const valB = b[sortConfig.key].toString().toLowerCase();

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredComments, sortConfig]);

  const paginatedComments = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedComments.slice(start, start + pageSize);
  }, [sortedComments, page, pageSize]);

  const totalPages = Math.ceil(sortedComments.length / pageSize);

  function handleSort(column) {
    setSortConfig(prev => {
      if (prev.key !== column) return { key: column, direction: 'asc' };
      if (prev.direction === 'asc') return { key: column, direction: 'desc' };
      if (prev.direction === 'desc') return { key: '', direction: '' };
      return { key: column, direction: 'asc' };
    });
  }

  return (
    <div className='container'>
      <h1>Comments Dashboard</h1>

      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap',gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by name,email,or body"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {PAGE_SIZE_OPTIONS.map(size => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      <div style={{ margin: '10px 0', display: 'flex', gap: '10px' }}>
        <button onClick={() => handleSort('postId')}>Sort by Post ID</button>
        <button onClick={() => handleSort('name')}>Sort by Name</button>
        <button onClick={() => handleSort('email')}>Sort by Email</button>
      </div>

      <table border="1" cellPadding="10" style={{ marginTop: '10px', width: '100%' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('postId')}>
              Post ID {sortConfig.key === 'postId' ? `(${sortConfig.direction})` : ''}
            </th>
            <th onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' ? `(${sortConfig.direction})` : ''}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortConfig.key === 'email' ? `(${sortConfig.direction})` : ''}
            </th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.map(c => (
            <tr key={c.id}>
              <td>{c.postId}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='pagination'>
        <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CommentsDashboard;