


export const exclude = (object,keys) => {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !keys.includes(key))
    )
  }

  export const excludeUserPassword = (object) => {
    delete object['user']['password']
    return object
  }
  