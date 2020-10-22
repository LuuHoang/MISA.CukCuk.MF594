using MISA.DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DataAccess.Repository
{
    public class BaseRepository<T>: IBaseRepository<T>
    {
        protected IDatabaseContext<T> _databaseContext;
        public BaseRepository(IDatabaseContext<T> databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public int Delete(Guid id)
        {
            return _databaseContext.Delete(id);
        }

        public IEnumerable<T> Get()
        {
            return _databaseContext.Get();
        }

        public IEnumerable<T> Get( int numberpage, int amount)
        {
            return _databaseContext.Get(numberpage, amount);
        }

        public T GetById(Guid objectId)
        {
            return _databaseContext.GetById(objectId);
        }

        public int Insert(T entity)
        {
            return _databaseContext.Insert(entity);
        }

        public int Update(T entity)
        {
            return _databaseContext.Update(entity);
        }
    }
}
